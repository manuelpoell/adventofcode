import { Challenge } from './challenge';

interface NetworkNodes {
  [key: string]: [string, string];
}

export class Day8 extends Challenge {
  partTwo: boolean;
  instructions: Array<string>;
  nodes: NetworkNodes = {};

  constructor(input: string, partTwo: boolean) {
    super();
    const lines = input.split('\n');
    this.instructions = lines[0].split('');
    lines.slice(2).forEach((line) => {
      const nodeNames = [...line.matchAll(/\w+/g)];
      this.nodes[nodeNames[0][0]] = [nodeNames[1][0], nodeNames[2][0]];
    });
    this.partTwo = partTwo;
  }

  solve = (): number => {
    if (!this.partTwo) {
      let step = 0;
      let currentNode = 'AAA';
      while (currentNode !== 'ZZZ') {
        currentNode = this.nodes[currentNode][this.nextPath(step)];
        step++;
      }
      return step;
    } else {
      let currentNodes = this.getStartingNodes();
      const stepsToDestinations = currentNodes.map((node) => {
        let steps = 0;
        let currentNode = node;
        while (!currentNode.endsWith('Z')) {
          currentNode = this.nodes[currentNode][this.nextPath(steps)];
          steps++;
        }
        return steps;
      });
      return this.lcmOfArray(stepsToDestinations);
    }
  };

  private nextPath = (step: number): number => {
    const path = this.instructions[step % this.instructions.length];
    return path === 'L' ? 0 : 1;
  };

  private getStartingNodes = (): Array<string> => {
    return Object.keys(this.nodes).filter((node) => node.endsWith('A'));
  };

  private lcmOfArray = (numbers: Array<number>): number => {
    let multiple = 1;
    for (let i = 0; i < numbers.length; i++) {
      multiple = this.lcm(multiple, numbers[i]);
    }
    return multiple;
  };

  private lcm = (a: number, b: number): number => {
    return (a * b) / this.gcd(a, b);
  };

  private gcd = (a: number, b: number): number => {
    if (b === 0) return a;
    return this.gcd(b, a % b);
  };
}
