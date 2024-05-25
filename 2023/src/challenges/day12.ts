import { Challenge } from './challenge';

interface ConditionRecord {
  row: string;
  groups: Array<number>;
}

function memoize(func: (...args: any) => any): (...args: any) => any {
  const stored = new Map<string, any>();

  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k)!;
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

export class Day12 extends Challenge {
  partTwo: boolean;
  records: Array<ConditionRecord>;

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.records = input.split('\n').map((line) => {
      const formats = line.split(' ');
      return {
        row: formats[0],
        groups: formats[1].split(',').map((group) => +group),
      };
    });
  }

  solve = (): number => {
    if (this.partTwo) {
      this.unfoldSpringArrangements();
    }
    return this.records.map(this.countPossibleArrangements).reduce((sum, value) => sum + value, 0);
  };

  private unfoldSpringArrangements = (): void => {
    this.records = this.records.map((record) => ({
      row: new Array<string>(5).fill(record.row).join('?'),
      groups: new Array<Array<number>>(5).fill(record.groups).flat(),
    }));
  };

  private countPossibleArrangements = memoize((record: ConditionRecord): number => {
    if (record.row.length === 0) {
      return record.groups.length === 0 ? 1 : 0;
    }

    if (record.groups.length === 0) {
      for (let i = 0; i < record.row.length; i++) {
        if (record.row[i] === '#') {
          return 0;
        }
      }
      return 1;
    }

    const groupSum = record.groups.reduce((sum, val) => sum + val, 0);
    if (record.row.length < groupSum + record.groups.length - 1) {
      return 0;
    }

    if (record.row[0] === '.') {
      return this.countPossibleArrangements({ row: record.row.slice(1), groups: record.groups });
    }

    if (record.row[0] === '#') {
      const [group, ...rest] = record.groups;
      for (let i = 0; i < group; i++) {
        if (record.row[i] === '.') {
          return 0;
        }
      }

      if (record.row[group] === '#') {
        return 0;
      }

      return this.countPossibleArrangements({ row: record.row.slice(group + 1), groups: rest });
    }

    return (
      this.countPossibleArrangements({ row: '#' + record.row.slice(1), groups: record.groups }) +
      this.countPossibleArrangements({ row: '.' + record.row.slice(1), groups: record.groups })
    );
  });
}
