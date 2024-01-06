import {program} from 'commander';
import * as fs from 'fs/promises';

class Challenge {
  sequences: Array<Array<number>> = [];

  constructor(input: string) {
    const lines = input.split('\n');
    lines.forEach((line) => {
      const sequence = line.split(' ').map((value) => +value);
      this.sequences.push(sequence);
    });
  }

  solve = (extra?: boolean): number => {
    return this.sequences
      .map(extra ? this.previousNumberInSequence : this.nextNumberInSequence)
      .reduce((sum, value) => sum + value, 0);
  }

  private nextNumberInSequence = (sequence: Array<number>): number => {
    const subSequences = this.getSubsequences(sequence);
    for (let i = subSequences.length - 1; i > 0; i--) {
      subSequences[i - 1].push(subSequences[i - 1][subSequences[i - 1].length - 1] + subSequences[i][subSequences[i].length - 1]);
    }

    return subSequences[0][subSequences[0].length - 1];
  }

  private previousNumberInSequence = (sequence: Array<number>): number => {
    const subSequences = this.getSubsequences(sequence);
    for (let i = subSequences.length - 1; i > 0; i--) {
      subSequences[i - 1].unshift(subSequences[i - 1][0] - subSequences[i][0]);
    }

    return subSequences[0][0];
  }

  private getSubsequences = (sequence: Array<number>): Array<Array<number>> => {
    const subSequences: Array<Array<number>> = [sequence];
    while (!subSequences[subSequences.length - 1]?.every((diff) => diff === 0)) {
      subSequences.push(this.getDifferenceOfSequence(subSequences[subSequences.length - 1]));
    }
    subSequences[subSequences.length - 1].push(0);
    return subSequences;
  }

  private getDifferenceOfSequence = (sequence: Array<number>): Array<number> => {
    const difference: Array<number> = [];
    sequence.forEach((value, i, seq) => {
      if (seq[i + 1] != undefined) {
        difference.push(seq[i + 1] - value);
      }
    });
    return difference;
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
