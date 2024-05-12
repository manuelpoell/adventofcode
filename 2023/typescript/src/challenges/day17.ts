import { Challenge } from './challenge';

interface State {
  x: number;
  y: number;
  dx: number;
  dy: number;
  consecutive: number;
  heatLoss: number;
}

class MinHeap<T> {
  private store: Array<T> = [];
  private sortFn: (a: T, b: T) => number;

  constructor(sortFn = (a: T, b: T) => 0) {
    this.sortFn = sortFn;
  }

  get length(): number {
    return this.store.length;
  }

  get values(): Array<T> {
    return JSON.parse(JSON.stringify(this.store));
  }

  push = (data: T): number => {
    this.store.push(data);
    this.store.sort(this.sortFn);
    return this.store.length;
  };

  pop = (): T | undefined => {
    return this.store.shift();
  };
}

export class Day17 extends Challenge {
  partTwo: boolean;
  blockGrid: Array<Array<number>>;
  private height: number;
  private width: number;
  private queue = new MinHeap<State>((a, b) => a.heatLoss - b.heatLoss);
  private visited = new Set<string>();
  private minSteps: number = 0;
  private maxSteps: number = 3;

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.blockGrid = input.split('\n').map((line) => line.split('').map((heatLoss) => +heatLoss));
    this.height = this.blockGrid.length;
    this.width = this.blockGrid[0].length;
  }

  solve = (): number => {
    if (this.partTwo) {
      this.minSteps = 4;
      this.maxSteps = 10;
    }
    return this.findHeatLoss();
  };

  private findHeatLoss = (): number => {
    this.goNext({ x: 0, y: 0, dx: 1, dy: 0, heatLoss: 0, consecutive: 1 });
    this.goNext({ x: 0, y: 0, dx: 0, dy: 1, heatLoss: 0, consecutive: 1 });

    while (this.queue.length > 0) {
      let { x, y, dx, dy, heatLoss, consecutive } = this.queue.pop()!;
      const destinationHeatLoss: Array<number | undefined> = [];

      if (consecutive >= this.minSteps) {
        destinationHeatLoss.push(this.goNext({ x, y, dx: dy, dy: -dx, heatLoss, consecutive: 1 }));
        destinationHeatLoss.push(this.goNext({ x, y, dx: -dy, dy: dx, heatLoss, consecutive: 1 }));
      }

      if (consecutive < this.maxSteps) {
        destinationHeatLoss.push(this.goNext({ x, y, dx, dy, heatLoss, consecutive: consecutive + 1 }));
      }

      const finalHeatLoss = destinationHeatLoss.find((v) => v != undefined);
      if (finalHeatLoss) return finalHeatLoss;
    }

    return -1;
  };

  private goNext = (state: State): number | undefined => {
    const { x, y, dx, dy, heatLoss, consecutive } = state;
    const [nextX, nextY] = [x + dx, y + dy];
    if (nextX < 0 || nextY < 0 || nextX >= this.width || nextY >= this.height) return;

    const newHeatLoss = heatLoss + this.blockGrid[nextY][nextX];
    if (nextX === this.width - 1 && nextY === this.height - 1 && consecutive >= this.minSteps) return newHeatLoss;

    const newState: State = { x: nextX, y: nextY, dx, dy, heatLoss: newHeatLoss, consecutive };
    const key = `${nextX}-${nextY}-${dx}-${dy}-${consecutive}`;
    if (!this.visited.has(key)) {
      this.queue.push(newState);
      this.visited.add(key);
    }
  };
}
