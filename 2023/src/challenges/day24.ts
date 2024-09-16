import { Challenge } from './challenge';

class Hailstone {
  representation: string;
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  a: number;
  b: number;
  c: number;

  constructor(input: string) {
    this.representation = input;
    const [posStr, velStr] = input.split('@');
    [this.x, this.y, this.z] = posStr.split(',').map((v) => +v.trim());
    [this.dx, this.dy, this.dz] = velStr.split(',').map((v) => +v.trim());
    this.a = this.dy;
    this.b = -this.dx;
    this.c = this.dy * this.x - this.dx * this.y;
  }
}

export class Day24 extends Challenge {
  partTwo: boolean;
  private hailstones: Array<Hailstone>;
  private min: number;
  private max: number;

  constructor(input: string, partTwo: boolean, testing: boolean = false) {
    super();
    this.partTwo = partTwo;
    this.hailstones = input
      .trim()
      .split('\n')
      .map((line) => new Hailstone(line));
    this.min = testing ? 7 : 200000000000000;
    this.max = testing ? 27 : 400000000000000;
  }

  solve = (): number => {
    if (this.partTwo) {
      const pos = this.getPositionOfRockThrown();
      return pos.reduce((sum, v) => sum + v, 0);
    }
    const intersections = this.findIntersections().filter((int) => int.every((p) => this.min <= p && p <= this.max));
    return intersections.length;
  };

  private findIntersections = (): Array<[number, number]> => {
    const intersections: Array<[number, number]> = [];
    this.hailstones.forEach((hs1, i) => {
      this.hailstones.slice(0, i).forEach((hs2) => {
        if (hs1.representation === hs2.representation) return;
        const [a1, b1, c1] = [hs1.a, hs1.b, hs1.c];
        const [a2, b2, c2] = [hs2.a, hs2.b, hs2.c];
        if (a1 * b2 === b1 * a2) return;
        const x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1);
        const y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1);

        if ([hs1, hs2].some((hs) => (x - hs.x) * hs.dx < 0 || (y - hs.y) * hs.dy < 0)) return;
        intersections.push([x, y]);
      });
    });

    return intersections;
  };

  // here follows part 2 code
  // implementing the solution of https://github.com/physbuzz/adventofcode/blob/master/day24/day24kek.js

  private linearSolve = (
    hs1: Hailstone,
    hs2: Hailstone,
    dx: number,
    dy: number,
    dz: number,
  ): Array<number> | undefined => {
    const mdx1 = dx - hs1.dx;
    const mdy1 = dy - hs1.dy;
    const mdz1 = dz - hs1.dz;
    const mdx2 = dx - hs2.dx;
    const mdy2 = dy - hs2.dy;
    const det = mdx2 * mdy1 - mdx1 * mdy2;
    if (det === 0) return undefined;
    return [
      (mdx2 * mdy1 * hs1.x - mdx1 * mdy2 * hs2.x + mdx1 * mdx2 * (-hs1.y + hs2.y)) / det,
      (mdy1 * mdy2 * (hs1.x - hs2.x) - mdx1 * mdy2 * hs1.y + mdx2 * mdy1 * hs2.y) / det,
      (mdy2 * mdz1 * (hs1.x - hs2.x) + mdx2 * mdz1 * (-hs1.y + hs2.y)) / det + hs1.z,
      (mdy2 * (-hs1.x + hs2.x) + mdx2 * (hs1.y - hs2.y)) / det,
      (mdy1 * (-hs1.x + hs2.x) + mdx1 * (hs1.y - hs2.y)) / det,
    ];
  };

  private errorFn = (dx: number, dy: number, dz: number): number | undefined => {
    const nums1 = this.linearSolve(this.hailstones[0], this.hailstones[1], dx, dy, dz);
    const nums2 = this.linearSolve(this.hailstones[2], this.hailstones[1], dx, dy, dz);
    if (!nums1 || !nums2) return undefined;
    const dsx = nums1[0] - nums2[0];
    const dsy = nums1[1] - nums2[1];
    const dsz = nums1[2] - nums2[2];
    const dt = nums1[4] - nums2[4];

    return dsx + dsy + dsz + dt;
  };

  private getPositionOfRockThrown = (): [number, number, number] => {
    let xm: number = 0;
    let ym: number = 0;
    let zm: number = 0;
    let minFound: number | undefined = undefined;
    const maxVel = this.getMaxVelocity();

    for (let r = 1; r < maxVel; r++) {
      for (let x = -r; x < r + 1; x++) {
        for (let y = -r; y < r + 1; y++) {
          for (let z = -r; z < r + 1; z += 2 * r) {
            let e = this.errorFn(x, y, z)!;
            if (!isNaN(e)) {
              if (minFound == undefined) {
                xm = x;
                ym = y;
                zm = z;
                minFound = Math.abs(e);
              } else if (Math.abs(e) < minFound) {
                xm = x;
                ym = y;
                zm = z;
                minFound = Math.abs(e);
              }
            }
          }
        }
      }
      for (let x = -r; x < r + 1; x++) {
        for (let y = -r; y < r + 1; y += 2 * r) {
          for (let z = -r; z < r + 1; z += 1) {
            let e = this.errorFn(x, y, z)!;
            if (!isNaN(e)) {
              if (minFound == undefined) {
                xm = x;
                ym = y;
                zm = z;
                minFound = Math.abs(e);
              } else if (Math.abs(e) < minFound) {
                xm = x;
                ym = y;
                zm = z;
                minFound = Math.abs(e);
              }
            }
          }
        }
      }
      for (let x = -r; x < r + 1; x += 2 * r) {
        for (let y = -r; y < r + 1; y++) {
          for (let z = -r; z < r + 1; z++) {
            let e = this.errorFn(x, y, z)!;
            if (!isNaN(e)) {
              if (minFound == undefined) {
                xm = x;
                ym = y;
                zm = z;
                minFound = Math.abs(e);
              } else if (Math.abs(e) < minFound) {
                xm = x;
                ym = y;
                zm = z;
                minFound = Math.abs(e);
              }
            }
          }
        }
      }
      if (minFound != undefined && minFound < 1) break;
    }

    const nums = this.linearSolve(this.hailstones[0], this.hailstones[1], xm, ym, zm)!;
    return [nums[0], nums[1], nums[2]];
  };

  private getMaxVelocity = (): number => {
    let max: number = 0;
    this.hailstones.forEach((hs) => {
      max = Math.max(max, Math.abs(hs.dx), Math.abs(hs.dy), Math.abs(hs.dz));
    });
    return max;
  };
}
