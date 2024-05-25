import { Challenge } from './challenge';

type Direction = 'N' | 'E' | 'S' | 'W';

export class Day14 extends Challenge {
  partTwo: boolean;
  platform: Array<string>;
  private cycles: number = 1000000000;
  private cache = new Map<string, number>();

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.platform = input.split('\n');
  }

  solve = (): number => {
    let tiltedPlatform = [...this.platform];
    if (!this.partTwo) {
      tiltedPlatform = this.tiltPlatform(this.platform, 'N');
    } else {
      for (let i = 0; i < this.cycles; i++) {
        tiltedPlatform = this.tiltPlatform(tiltedPlatform, 'N');
        tiltedPlatform = this.tiltPlatform(tiltedPlatform, 'W');
        tiltedPlatform = this.tiltPlatform(tiltedPlatform, 'S');
        tiltedPlatform = this.tiltPlatform(tiltedPlatform, 'E');

        const key = tiltedPlatform.join('');
        if (this.cache.has(key)) {
          const firstOccured = this.cache.get(key);
          if ((this.cycles - i - 1) % (i + 1 - firstOccured!) === 0) break;
        }
        this.cache.set(key, i + 1);
      }
    }

    return tiltedPlatform
      .reverse()
      .map((row, i) => {
        const roundRockRegex = new RegExp('O', 'g');
        return [...row.matchAll(roundRockRegex)].length * (i + 1);
      })
      .reduce((sum, val) => sum + val, 0);
  };

  private tiltPlatform = (platform: Array<string>, direction: Direction): Array<string> => {
    const tempPlatform = [...platform].map((row) => row.split(''));

    for (let y = 0; y < platform.length; y++) {
      for (let x = 0; x < platform[0].length; x++) {
        if (direction === 'N' && y > 0 && tempPlatform[y][x] === 'O' && tempPlatform[y - 1][x] === '.') {
          tempPlatform[y - 1][x] = 'O';
          tempPlatform[y][x] = '.';
        } else if (
          direction === 'S' &&
          y + 1 < platform.length &&
          tempPlatform[y][x] === 'O' &&
          tempPlatform[y + 1][x] === '.'
        ) {
          tempPlatform[y + 1][x] = 'O';
          tempPlatform[y][x] = '.';
        } else if (direction === 'W' && tempPlatform[y][x] === 'O' && tempPlatform[y][x - 1] === '.') {
          tempPlatform[y][x - 1] = 'O';
          tempPlatform[y][x] = '.';
        } else if (direction === 'E' && tempPlatform[y][x] === 'O' && tempPlatform[y][x + 1] === '.') {
          tempPlatform[y][x + 1] = 'O';
          tempPlatform[y][x] = '.';
        }
      }
    }

    const tilted = tempPlatform.map((row) => row.join(''));

    if (tilted.every((row, i) => platform[i] === row)) {
      return tilted;
    }
    return this.tiltPlatform(tilted, direction);
  };
}
