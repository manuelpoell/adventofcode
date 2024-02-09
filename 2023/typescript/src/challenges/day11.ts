import { Challenge } from './challenge';

type Position = [number, number];

export class Day11 extends Challenge {
  cosmos: Array<string>;
  galaxies: Array<Position> = [];
  emptyColumns: Array<number> = [];
  emptyRows: Array<number> = [];
  emptySpaceMultiplicator: number;

  constructor(input: string, partTwo: boolean) {
    super();
    this.emptySpaceMultiplicator = partTwo ? 1000000 : 2;
    this.cosmos = input.split('\n');
  }

  solve = (): number => {
    this.expandCosmos();
    this.getGalaxies();
    const distances: Array<number> = [];
    this.galaxies.forEach((galaxy, i) => {
      if (i === this.galaxies.length - 1) return;
      const destinations = this.galaxies.slice(i + 1);
      destinations.forEach((destination) => {
        distances.push(this.calcDistance(galaxy, destination));
      });
    });
    return distances.reduce((sum, distance) => sum + distance, 0);
  };

  private expandCosmos = (): void => {
    for (let i = 0; i < this.cosmos.length; i++) {
      if (!this.cosmos[i].includes('#')) {
        this.emptyRows.push(i);
      }
    }

    for (let i = 0; i < this.cosmos[0].length; i++) {
      if (this.cosmos.every((line) => line[i] !== '#')) {
        this.emptyColumns.push(i);
      }
    }
  };

  private getGalaxies = (): void => {
    this.cosmos.forEach((line, i) => {
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '#') {
          this.galaxies.push([j, i]);
        }
      }
    });
  };

  private calcDistance = (a: Position, b: Position): number => {
    let distance = Math.abs(Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]));

    const emptyRowsPassed = this.emptyRows.filter((y) => Math.min(a[1], b[1]) < y && Math.max(a[1], b[1]) > y).length;
    distance += emptyRowsPassed * this.emptySpaceMultiplicator - emptyRowsPassed;

    const emptyColumnsPassed = this.emptyColumns.filter(
      (x) => Math.min(a[0], b[0]) < x && Math.max(a[0], b[0]) > x,
    ).length;
    distance += emptyColumnsPassed * this.emptySpaceMultiplicator - emptyColumnsPassed;

    return distance;
  };
}
