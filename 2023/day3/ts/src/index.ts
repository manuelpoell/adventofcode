import {program} from 'commander';
import * as fs from 'fs/promises';

class Challenge {
  lines: Array<string>;

  constructor(input: string) {
    this.lines = input.split('\n');
  }

  solve(extra?: boolean): number {
    const mapFn = extra ? this.getGearRatios : this.getValidNumbers;
    return this.lines
      .map((line, i, lines) => mapFn(line, {before: lines[i - 1], after: lines[i + 1]}))
      .flat()
      .reduce((sum, value) => sum + value, 0);
  }

  private getValidNumbers(line: string, adjacent: {
    before: string | undefined,
    after: string | undefined
  }): Array<number> {
    const matches = [...line.matchAll(/\d+/g)];
    const validNumbers = matches.filter((match) => {
      const num = match[0];
      if (match.index == undefined) return false;
      const regex = /[^.\d]/;
      const searchStr = (adjacent.before?.slice(Math.max(0, match.index - 1), match.index + num.length + 1) ?? '')
        + line.slice(Math.max(0, match.index - 1), match.index + num.length + 1)
        + (adjacent.after?.slice(Math.max(0, match.index - 1), match.index + num.length + 1) ?? '');
      return regex.test(searchStr);
    });
    return validNumbers.map((match) => parseInt(match[0]));
  }

  private getGearRatios(line: string, adjacent: {
    before: string | undefined,
    after: string | undefined
  }): Array<number> {
    const gears: Array<[number, number]> = [];
    const matches = [...line.matchAll(/\*/g)];
    matches.forEach((match) => {
      const numsAdjacent: Array<number> = [];
      const regex = /\d+/g;

      const numSameLine = [...line.matchAll(regex)];
      numSameLine.forEach((num) => {
        if (match.index == undefined || num.index == undefined) return;
        const isAdjacent =
          match.index + 1 === num.index
          || match.index === num.index + num[0].length;
        if (isAdjacent) numsAdjacent.push(parseInt(num[0]));
      });

      const numAdjacentLines = [...(adjacent.before?.matchAll(regex) ?? []), ...(adjacent.after?.matchAll(regex) ?? [])];
      numAdjacentLines.forEach((num) => {
        if (match.index == undefined || num.index == undefined) return;
        const startIndex = num.index;
        const endIndex = num.index + num[0].length - 1;
        const offsets = [-1, 0, 1];

        const isAdjacent = offsets.some(
          (off) => (match.index! + off) >= startIndex && (match.index! + off) <= endIndex
        );
        if (isAdjacent) numsAdjacent.push(parseInt(num[0]));
      });

      if (numsAdjacent.length === 2) {
        gears.push([numsAdjacent[0], numsAdjacent[1]]);
      }
    });
    return gears.map((gear) => gear[0] * gear[1]);
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
      const result = challenge.solve(extra);
      console.log(result);
    })
    .catch(() => console.log(`failed to parse file ${file}`));
};
main();
