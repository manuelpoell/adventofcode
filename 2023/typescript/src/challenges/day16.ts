import { Challenge } from './challenge';

type Grid = Array<Array<string>>;
type Position = [number, number];
type Direction = 'N' | 'E' | 'S' | 'W';

export class Day16 extends Challenge {
  partTwo: boolean;
  grid: Grid;
  private energizedGrid: Grid;
  private energizedValues: Array<number> = [];
  private cache = new Map<string, boolean>();

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.grid = input.split('\n').map((line) => line.split(''));
    this.energizedGrid = JSON.parse(JSON.stringify(this.grid));
  }

  solve = (): number => {
    if (!this.partTwo) {
      this.sendBeam([0, 0], 'E');
      return this.energizedGrid
        .map((line) => line.filter((char) => char === '#').length)
        .reduce((sum, value) => sum + value, 0);
    }

    for (let y = 0; y < this.grid.length; y++) {
      this.sendBeam([y, 0], 'E');
      this.saveAndReset();
      this.sendBeam([y, this.grid[0].length - 1], 'W');
      this.saveAndReset();
    }

    for (let x = 0; x < this.grid[0].length; x++) {
      this.sendBeam([0, x], 'S');
      this.saveAndReset();
      this.sendBeam([this.grid.length - 1, x], 'N');
      this.saveAndReset();
    }

    return Math.max(...this.energizedValues);
  };

  private saveAndReset = (): void => {
    this.energizedValues.push(
      this.energizedGrid
        .map((line) => line.filter((char) => char === '#').length)
        .reduce((sum, value) => sum + value, 0),
    );
    this.cache.clear();
    this.energizedGrid = JSON.parse(JSON.stringify(this.grid));
  };

  private sendBeam = (start: Position, direction: Direction): void => {
    const [y, x] = [...start];
    switch (direction) {
      case 'N':
        for (let i = y; i >= 0; i--) {
          const cacheKey = `${i}-${x}-${direction}`;
          if (this.cache.has(cacheKey)) return;
          this.cache.set(cacheKey, true);
          this.energizedGrid[i][x] = '#';
          switch (this.grid[i][x]) {
            case '/':
              return this.sendBeam([i, x + 1], 'E');
            case '\\':
              return this.sendBeam([i, x - 1], 'W');
            case '-':
              this.sendBeam([i, x + 1], 'E');
              this.sendBeam([i, x - 1], 'W');
              return;
          }
        }
        break;
      case 'E':
        for (let i = x; i < this.grid[0].length; i++) {
          const cacheKey = `${y}-${i}-${direction}`;
          if (this.cache.has(cacheKey)) return;
          this.cache.set(cacheKey, true);
          this.energizedGrid[y][i] = '#';
          switch (this.grid[y][i]) {
            case '/':
              return this.sendBeam([y - 1, i], 'N');
            case '\\':
              return this.sendBeam([y + 1, i], 'S');
            case '|':
              this.sendBeam([y - 1, i], 'N');
              this.sendBeam([y + 1, i], 'S');
              return;
          }
        }
        break;
      case 'S':
        for (let i = y; i < this.grid.length; i++) {
          const cacheKey = `${i}-${x}-${direction}`;
          if (this.cache.has(cacheKey)) return;
          this.cache.set(cacheKey, true);
          this.energizedGrid[i][x] = '#';
          switch (this.grid[i][x]) {
            case '/':
              return this.sendBeam([i, x - 1], 'W');
            case '\\':
              return this.sendBeam([i, x + 1], 'E');
            case '-':
              this.sendBeam([i, x + 1], 'E');
              this.sendBeam([i, x - 1], 'W');
              return;
          }
        }
        break;
      case 'W':
        for (let i = x; i >= 0; i--) {
          const cacheKey = `${y}-${i}-${direction}`;
          if (this.cache.has(cacheKey)) return;
          this.cache.set(cacheKey, true);
          this.energizedGrid[y][i] = '#';
          switch (this.grid[y][i]) {
            case '/':
              return this.sendBeam([y + 1, i], 'S');
            case '\\':
              return this.sendBeam([y - 1, i], 'N');
            case '|':
              this.sendBeam([y - 1, i], 'N');
              this.sendBeam([y + 1, i], 'S');
              return;
          }
        }
        break;
      default:
        return;
    }
  };
}
