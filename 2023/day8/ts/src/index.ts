import {program} from 'commander';
import * as fs from 'fs/promises';

interface NetworkNodes {
  [key: string]: [string, string];
}

class Challenge {
  instructions: Array<string>;
  nodes: NetworkNodes = {};

  constructor(input: string) {
    const lines = input.split('\n');
    this.instructions = lines[0].split('');
    lines.slice(2).forEach((line) => {
      const nodeNames = [...line.matchAll(/\w+/g)];
      this.nodes[nodeNames[0][0]] = [nodeNames[1][0], nodeNames[2][0]];
    });
  }

  solve = (extra?: boolean): number => {
    if (!extra) {
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
  }

  private nextPath = (step: number): number => {
    const path = this.instructions[step % this.instructions.length];
    return path === 'L' ? 0 : 1;
  }

  private getStartingNodes = (): Array<string> => {
    return Object.keys(this.nodes).filter((node) => node.endsWith('A'));
  }

  private lcmOfArray = (numbers: Array<number>): number => {
    let multiple = 1;
    for (let i = 0; i < numbers.length; i++) {
      multiple = this.lcm(multiple, numbers[i]);
    }
    return multiple;
  }

  private lcm = (a: number, b: number): number => {
    return (a * b) / this.gcd(a, b);
  }

  private gcd = (a: number, b: number): number => {
    if (b === 0) return a;
    return this.gcd(b, a % b);
  }
}

export const main = () => {
  program
    .option('-f, --file <filepath>', 'Path to input file', '../input.txt')
    .option('-e, --extra', 'Enable functions for part two', false)
    .parse();
  const {file, extra} = program.opts<{ file: string, extra: boolean }>();

  fs.readFile(file, 'utf-8')
    .then((content) => {
      if (!content) {
        console.log(`failed to read content of ${file}`);
        return;
      }

      const challenge = new Challenge(content);
      console.log(challenge.solve(extra));
    })
    .catch(() => console.log(`failed to parse file ${file}`));
};
main();
