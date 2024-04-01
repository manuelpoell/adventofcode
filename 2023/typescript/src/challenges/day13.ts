import { Challenge } from './challenge';

type Pattern = Array<string>;

export class Day13 extends Challenge {
  partTwo: boolean;
  patterns: Array<Pattern>;

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.patterns = input.split('\n\n').map((pattern) => pattern.split('\n'));
  }

  solve = (): number => {
    return this.patterns.map(this.calcReflectionValue).reduce((sum, notes) => sum + notes, 0);
  };

  private calcReflectionValue = (pattern: Array<string>): number => {
    const originalResult = this.getVerticalReflectionValue(pattern) || this.getHorizontalReflectionValue(pattern);
    if (!this.partTwo) {
      return originalResult;
    }

    const patternVariations: Array<Array<string>> = [];
    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[0].length; x++) {
        const patternVar = pattern.map((line) => line.split(''));
        patternVar[y][x] = this.invertSymbol(patternVar[y][x]);
        patternVariations.push(patternVar.map((line) => line.join('')));
      }
    }

    let result = 0;
    for (const variation of patternVariations) {
      result =
        this.getVerticalReflectionValue(variation, originalResult) ||
        this.getHorizontalReflectionValue(variation, originalResult);
      if (result) break;
    }

    return result;
  };

  private getVerticalReflectionValue = (pattern: Pattern, skip?: number): number => {
    for (let x = 1; x < pattern[0].length; x++) {
      if (skip === x) continue;
      if (pattern.every((line) => this.columnsReflecting(line.split('').slice(0, x), line.split('').slice(x)))) {
        return x;
      }
    }
    return 0;
  };

  private getHorizontalReflectionValue = (pattern: Pattern, skip?: number): number => {
    const offsets = [...Array(pattern.length).keys()];
    for (let y = 1; y < pattern.length; y++) {
      if (skip && skip / 100 === y) continue;
      if (offsets.every((offset) => this.linesReflecting(pattern[y - offset - 1], pattern[y + offset]))) {
        return y * 100;
      }
    }
    return 0;
  };

  private columnsReflecting = (a: Array<string>, b: Array<string>): boolean => {
    return a.join('').endsWith([...b].reverse().join('')) || b.join('').startsWith([...a].reverse().join(''));
  };

  private linesReflecting = (a: string | undefined, b: string | undefined): boolean => {
    return a === b || !a || !b;
  };

  private invertSymbol = (symbol: string): string => {
    return symbol === '#' ? '.' : '#';
  };
}
