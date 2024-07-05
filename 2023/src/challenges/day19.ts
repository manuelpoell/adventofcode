import { Challenge } from './challenge';

interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

interface WorkflowElement {
  condition: string;
  next: string;
}

interface Workflow {
  elements: Array<WorkflowElement>;
  name: string;
}

interface Range {
  currentWorkflow: string;
  x: { min: number; max: number };
  m: { min: number; max: number };
  a: { min: number; max: number };
  s: { min: number; max: number };
}

export class Day19 extends Challenge {
  partTwo: boolean;
  workflows: Array<Workflow> = [];
  parts: Array<Part> = [];
  ranges: Array<Range> = [];

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.parseWorkflows(input);
    this.parseParts(input);
  }

  solve = (): number => {
    const acceptedParts = this.filterParts();
    let result = 0;
    if (this.partTwo) {
      this.parseValidRanges();
      result = this.ranges.reduce((sum, range) => {
        let possibleCount = 1;
        possibleCount *= range.x.max - range.x.min + 1;
        possibleCount *= range.m.max - range.m.min + 1;
        possibleCount *= range.a.max - range.a.min + 1;
        possibleCount *= range.s.max - range.s.min + 1;
        return sum + possibleCount;
      }, 0);
    } else {
      result = acceptedParts.reduce((sum, part) => sum + Object.values(part).reduce((value, attr) => value + attr), 0);
    }
    return result;
  };

  private parseValidRanges = (): void => {
    const start: Range = {
      currentWorkflow: 'in',
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    };

    this.traverse(start);
  };

  private traverse = (range: Range): void => {
    if (['A', 'R'].includes(range.currentWorkflow)) {
      range.currentWorkflow === 'A' && this.ranges.push(range);
      return;
    }

    const workflow = this.workflows.find((workflow) => workflow.name === range.currentWorkflow);
    if (!workflow) return;

    for (let element of workflow.elements) {
      const newRange = this.updateRange(range, element.condition);
      newRange.currentWorkflow = element.next;
      this.traverse(newRange);
    }
  };

  private updateRange = (range: Range, condition: string): Range => {
    const newRange: Range = JSON.parse(JSON.stringify(range));
    if (condition === 'true') {
      return newRange;
    }
    const attribute = condition[0] as keyof Omit<typeof range, 'currentWorkflow'>;
    const comparison = condition[1];
    const value = Number(condition.slice(2));

    if (comparison === '>') {
      newRange[attribute].min = Math.max(newRange[attribute].min, value + 1);
      range[attribute].max = Math.min(range[attribute].max, value);
    } else {
      newRange[attribute].max = Math.min(newRange[attribute].max, value - 1);
      range[attribute].min = Math.max(range[attribute].min, value);
    }
    return newRange;
  };

  private checkCondition = (part: Part, condition: string): boolean => {
    if (condition === 'true') return true;
    const attribute = condition[0] as keyof typeof part;
    const comparison = condition[1];
    const value = Number(condition.slice(2));

    if (comparison === '>') return part[attribute] > value;
    return part[attribute] < value;
  };

  private filterParts = (): Array<Part> => {
    return this.parts.filter((part) => {
      let nextWorkflow = 'in';
      while (nextWorkflow !== 'A' && nextWorkflow !== 'R') {
        const workflow = this.workflows.find((wf) => wf.name === nextWorkflow)!;
        for (const element of workflow.elements) {
          if (this.checkCondition(part, element.condition)) {
            nextWorkflow = element.next;
            break;
          }
        }
      }
      return nextWorkflow === 'A';
    });
  };

  private parseWorkflows = (input: string) => {
    const workflows = input.split('\n\n')[0].trim();
    this.workflows = workflows.split('\n').map((line) => {
      const startIndex = line.indexOf('{');
      const name = line.slice(0, startIndex);
      const elements: Array<WorkflowElement> = line
        .slice(startIndex + 1, line.length - 1)
        .split(',')
        .map((element) => {
          if (element.indexOf(':') < 0) {
            return { next: element, condition: 'true' };
          }
          const [condition, next] = element.split(':');
          return { next, condition };
        });

      return {
        name,
        elements,
      };
    });
  };

  private parseParts = (input: string) => {
    const partsString = input.split('\n\n')[1].trim();
    this.parts = partsString.split('\n').map((line) => {
      const part: Part = { x: 0, m: 0, a: 0, s: 0 };
      let attribute: keyof typeof part;
      for (attribute in part) {
        let endChar = ',';
        if (attribute === 's') {
          endChar = '}';
        }

        const value = Number(line.slice(line.indexOf(attribute) + 2, line.indexOf(endChar, line.indexOf(attribute))));
        part[attribute] = value;
      }
      return part;
    });
  };
}
