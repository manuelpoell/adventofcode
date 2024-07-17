import { Challenge } from './challenge';

type Position = [number, number];
type GardenPlot = '.' | '#' | 'S' | undefined;

export class Day21 extends Challenge {
  partTwo: boolean;
  steps: number = 64;
  private garden: Array<Array<GardenPlot>> = [];
  private cache: { [key: string]: Array<Position> } = {};

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.garden = input
      .trim()
      .split('\n')
      .map((line) => line.trim().split('') as Array<GardenPlot>);
  }

  solve = (): number => {
    let start: Position = [0, 0];
    for (let i = 0; i < this.garden.length; i++) {
      for (let j = 0; j < this.garden[0].length; j++) {
        if (this.garden[i][j] === 'S') start = [i, j];
      }
    }

    if (this.partTwo) {
      // with the assumption of 26501365 = 202300 * gardenSize + 65
      // assuming garden width === garden height
      const gardenSize = this.garden.length;
      const values = [
        this.countReachablePlots(start, 65),
        this.countReachablePlots(start, 65 + gardenSize),
        this.countReachablePlots(start, 65 + gardenSize * 2),
      ];
      const poly = this.simplifiedLagrange(values);
      const target = (26501365 - 65) / gardenSize;
      return poly.a * target * target + poly.b * target + poly.c;
    }

    return this.countReachablePlots(start, this.steps);
  };

  private countReachablePlots = (start: Position, steps: number): number => {
    let marked: Array<Position> = [start];
    for (let i = 0; i < steps; i++) {
      const newMarked: Array<Position> = [];
      const temp: { [key: string]: boolean } = {};
      marked.forEach((pos) => {
        const validNext = this.getValidNextSteps(pos);
        validNext.forEach((next) => {
          const key = `${next[0]}/${next[1]}`;
          if (!temp[key]) {
            newMarked.push(next);
            temp[key] = true;
          }
        });
      });
      marked = [...newMarked];
    }
    return marked.length;
  };

  private getGardenPlot = (position: Position): GardenPlot => {
    if (this.partTwo) {
      const X = this.garden[0].length;
      const Y = this.garden.length;

      const y = ((position[0] % Y) + Y) % Y;
      const x = ((position[1] % X) + X) % X;
      return this.garden[y][x];
    }

    let plot: GardenPlot = undefined;
    if (this.garden[position[0]]) {
      plot = this.garden[position[0]][position[1]] as GardenPlot;
    }
    return plot;
  };

  private getValidNextSteps = (position: Position): Array<Position> => {
    const key = `${position[0]}/${position[1]}`;
    if (this.cache[key]) return this.cache[key];

    const validPlots: Array<GardenPlot> = ['.', 'S'];
    const next: Array<Position> = [
      [position[0] - 1, position[1]],
      [position[0] + 1, position[1]],
      [position[0], position[1] - 1],
      [position[0], position[1] + 1],
    ];
    const validNext = next.filter((pos) => validPlots.includes(this.getGardenPlot(pos)));
    this.cache[key] = validNext;
    return validNext;
  };

  private simplifiedLagrange = (values: Array<number>): { a: number; b: number; c: number } => {
    return {
      a: values[0] / 2 - values[1] + values[2] / 2,
      b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
      c: values[0],
    };
  };
}
