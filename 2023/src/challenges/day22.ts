import { Challenge } from './challenge';

class Brick {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  supports: Array<number> = [];
  supportedBy: Array<number> = [];

  constructor(positions: string) {
    const [pos1, pos2] = positions.split('~');
    [this.x1, this.y1, this.z1] = pos1.split(',').map((value) => +value);
    [this.x2, this.y2, this.z2] = pos2.split(',').map((value) => +value);
  }

  overlaps = (brick: Brick): boolean => {
    return (
      Math.max(this.x1, brick.x1) <= Math.min(this.x2, brick.x2) &&
      Math.max(this.y1, brick.y1) <= Math.min(this.y2, brick.y2)
    );
  };
}

export class Day22 extends Challenge {
  partTwo: boolean;
  private bricks: Array<Brick> = [];

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.bricks = input
      .trim()
      .split('\n')
      .map((line) => new Brick(line));
  }

  solve = (): number => {
    this.settleBricks();
    if (!this.partTwo) {
      return this.countDisintegratable();
    }
    return this.bricks.reduce((sum, _, i) => sum + this.countChainReactionFor(i), 0);
  };

  private settleBricks = (): void => {
    this.sortByZ();
    for (let i = 0; i < this.bricks.length; i++) {
      const upper = this.bricks[i];
      let settledZ = 1;
      for (let j = 0; j < i; j++) {
        const lower = this.bricks[j];
        if (lower.overlaps(upper)) {
          settledZ = Math.max(settledZ, lower.z2 + 1);
        }
      }
      upper.z2 = upper.z2 - upper.z1 + settledZ;
      upper.z1 = settledZ;
    }

    this.sortByZ();
    for (let i = 0; i < this.bricks.length; i++) {
      const upper = this.bricks[i];
      for (let j = 0; j < i; j++) {
        const lower = this.bricks[j];
        if (upper.z1 - lower.z2 === 1 && lower.overlaps(upper)) {
          upper.supportedBy.push(j);
          lower.supports.push(i);
        }
      }
    }
  };

  private countChainReactionFor = (i: number): number => {
    const queue: Array<number> = [i];
    const falling = new Set<number>(queue);
    const willFall = (index: number) =>
      !falling.has(index) && this.bricks[index].supportedBy.every((sb) => falling.has(sb));

    while (queue.length > 0) {
      const j = queue.shift()!;
      for (const di of this.bricks[j].supports.filter(willFall)) {
        falling.add(di);
        queue.push(di);
      }
    }

    return falling.size - 1;
  };

  private countDisintegratable = (): number => {
    let disintegratable: number = 0;
    for (const brick of this.bricks) {
      if (!this.isNeeded(brick)) {
        disintegratable++;
      }
    }

    return disintegratable;
  };

  private isNeeded = (brick: Brick): boolean => {
    for (const i of brick.supports) {
      const supported = this.bricks[i];
      if (supported.supportedBy.length === 1) return true;
    }
    return false;
  };

  private sortByZ = (): void => {
    this.bricks.sort((a, b) => a.z1 - b.z1);
  };
}
