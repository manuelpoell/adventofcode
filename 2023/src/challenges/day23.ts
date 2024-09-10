import { Challenge } from './challenge';

type Position = [number, number];
type Tile = '.' | '#' | '<' | '>' | 'v' | '^';
type State = { steps: number; position: Position; visited: Array<string> };

export class Day23 extends Challenge {
  partTwo: boolean;
  hikingMap: Array<string>;
  private jumps: { [key: string]: Array<number> } = {};

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.hikingMap = input.trim().split('\n');
  }

  solve = (): number => {
    if (this.partTwo) this.normalizeTiles();

    const start = this.getStartPos();
    const end = this.getEndPos();
    const endKey = this.getPositionKey(end);

    let maxLength: number = 0;
    const queue: Array<State> = [{ steps: 0, position: [...start], visited: [] }];
    while (queue.length > 0) {
      const current = queue.shift()!;
      const posKey = this.getPositionKey(current.position);
      if (posKey === endKey) {
        maxLength = Math.max(maxLength, current.steps);
        continue;
      }

      const neighbours = this.getNextPossibleMoves(current.position);
      let next: Array<State> = [];
      if (neighbours.length === 2) {
        const prevKey = current.visited[current.visited.length - 1];
        this.findJump(current.position, this.keyToPosition(prevKey));
        const jump = this.jumps[posKey];
        if (!jump) continue;
        const [x, y, lastX, lastY, distance] = jump;
        if (current.visited.includes(this.getPositionKey([x, y]))) continue;
        next = [
          {
            position: [x, y],
            steps: current.steps + distance,
            visited: [...current.visited, posKey, this.getPositionKey([lastX, lastY])],
          },
        ];
      } else {
        next = neighbours
          .filter((pos) => !current.visited.includes(this.getPositionKey(pos)))
          .map((pos) => ({
            steps: current.steps + 1,
            position: pos,
            visited: [...current.visited, posKey],
          }));
      }
      queue.unshift(...next);
    }

    return maxLength;
  };

  private normalizeTiles = (): void => {
    this.hikingMap = this.hikingMap.map((line) => line.replaceAll(/[<>^v]/g, '.'));
  };

  private getNextPossibleMoves = (current: Position): Array<Position> => {
    switch (this.getTileOfPosition(current)) {
      case '<':
        return [[current[0] - 1, current[1]]];
      case '>':
        return [[current[0] + 1, current[1]]];
      case 'v':
        return [[current[0], current[1] + 1]];
      case '^':
        return [[current[0], current[1] - 1]];
      default:
        return (
          [
            [current[0] + 1, current[1]],
            [current[0] - 1, current[1]],
            [current[0], current[1] + 1],
            [current[0], current[1] - 1],
          ] as Array<Position>
        ).filter((pos) => !['#', undefined].includes(this.getTileOfPosition(pos)));
    }
  };

  private getTileOfPosition = (pos: Position): Tile | undefined => {
    if (pos[0] >= this.hikingMap[0].length || pos[0] < 0) return undefined;
    if (pos[1] >= this.hikingMap.length || pos[1] < 0) return undefined;
    return this.hikingMap[pos[1]][pos[0]] as Tile;
  };

  private findJump = (position: Position, prev: Position): void => {
    const posKey = this.getPositionKey(position);
    if (this.jumps[posKey]) return;

    let current = [...position];
    let previous = [...prev];
    let nexts = [...this.getNextPossibleMoves(position)];
    let distance = 1;
    while (nexts.length === 2) {
      const next = nexts.find((pos) => this.getPositionKey(pos) !== this.getPositionKey(previous as Position));
      if (!next) break;
      this.jumps[posKey] = [...next, ...current, distance++];
      previous = [...current];
      current = [...next];
      nexts = [...this.getNextPossibleMoves(current as Position)];
    }
  };

  private getPositionKey = (pos: Position): string => {
    return `${pos[0]}-${pos[1]}`;
  };

  private keyToPosition = (key: string): Position => {
    return key.split('-').map((v) => +v) as Position;
  };

  private getStartPos = (): Position => {
    return [this.hikingMap[0].indexOf('.'), 0];
  };

  private getEndPos = (): Position => {
    const lastIndex = this.hikingMap.length - 1;
    return [this.hikingMap[lastIndex].indexOf('.'), lastIndex];
  };
}
