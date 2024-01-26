import { Challenge } from './challenge';

type Maze = Array<Array<string>>;
type Position = [number, number];

export class Day10 extends Challenge {
  partTwo: boolean;
  maze: Maze = [];

  constructor(input: string, partTwo: boolean) {
    super();
    this.maze = input.split('\n').map((line) => line.split(''));
    this.partTwo = partTwo;
  }

  solve = (): number => {
    const start = this.getStartPosition();
    let current = start;
    let previous: Position | undefined = undefined;
    let path: Array<Position> = [];
    while (!previous || !(current[0] === start[0] && current[1] === start[1])) {
      const oldPrevious = previous;
      previous = current;
      current = this.nextPosition(current, oldPrevious);
      path.push(current);
    }

    if (!this.partTwo) {
      return path.length / 2;
    } else {
      return this.calcTilesInMaze(path);
    }
  };

  private nextPosition = (cur: Position, prev: Position | undefined): Position => {
    const possibleMoves = this.getPossibleNext(cur);
    if (!prev) {
      return possibleMoves[0];
    }

    const [prevY, prevX] = prev;
    return possibleMoves.filter((possible) => !(possible[0] === prevY && possible[1] === prevX))[0];
  };

  private getPossibleNext = (cur: Position): Array<Position> => {
    const possible: Array<Position> = [];
    const [y, x] = cur;
    const currentSymbol = this.getSymbol(cur);
    const up: Position = [y - 1, x];
    const down: Position = [y + 1, x];
    const left: Position = [y, x - 1];
    const right: Position = [y, x + 1];

    if (['S', '|', 'F', '7'].includes(this.getSymbol(up)) && ['S', '|', 'L', 'J'].includes(currentSymbol)) {
      possible.push(up);
    }
    if (['S', '|', 'L', 'J'].includes(this.getSymbol(down)) && ['S', '|', 'F', '7'].includes(currentSymbol)) {
      possible.push(down);
    }
    if (['S', '-', 'F', 'L'].includes(this.getSymbol(left)) && ['S', '-', 'J', '7'].includes(currentSymbol)) {
      possible.push(left);
    }
    if (['S', '-', '7', 'J'].includes(this.getSymbol(right)) && ['S', '-', 'F', 'L'].includes(currentSymbol)) {
      possible.push(right);
    }

    return possible;
  };

  private getSymbol = (pos: Position): string => {
    const [y, x] = pos;
    return this.maze[y] && this.maze[y][x] ? this.maze[y][x] : '.';
  };

  private getStartPosition = (): Position => {
    const y = this.maze.findIndex((line) => line.includes('S'));
    const x = this.maze[y].indexOf('S');
    return [y, x];
  };

  private calcTilesInMaze = (path: Array<Position>): number => {
    // using shoelace formula / Gauss's area formula
    let area = 0;
    path.forEach((_, i) => {
      const j = (i + 1) % path.length;
      area += path[i][0] * path[j][1];
      area -= path[j][0] * path[i][1];
    });
    area = Math.floor(Math.abs(area) / 2);
    return area - Math.floor(path.length / 2) + 1;
  };
}
