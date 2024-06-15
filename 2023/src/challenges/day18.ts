import { Challenge } from './challenge';

type Position = [number, number];

interface Instruction {
  direction: string;
  value: number;
  colorCode: string;
}

export class Day18 extends Challenge {
  partTwo: boolean;
  private instructions: Array<Instruction>;
  private directionMap = new Map<string, string>([
    ['0', 'R'],
    ['1', 'D'],
    ['2', 'L'],
    ['3', 'U'],
  ]);

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.instructions = input
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split(' ');
        return {
          direction: parts[0],
          value: +parts[1],
          colorCode: parts[2].slice(2, 8),
        };
      });
  }

  solve = (): number => {
    if (this.partTwo) {
      this.instructions = this.instructions.map((instruction) => ({
        colorCode: instruction.colorCode,
        value: Number('0x' + instruction.colorCode.slice(0, instruction.colorCode.length - 1)),
        direction: this.directionMap.get(instruction.colorCode[instruction.colorCode.length - 1])!,
      }));
    }
    const polygon: Array<Position> = this.dig();
    return this.calcArea(polygon);
  };

  private dig = (): Array<Position> => {
    const polygon: Array<Position> = [[0, 0]];
    this.instructions.forEach((instruction) => {
      const currentPos: Position = polygon[polygon.length - 1];
      const nextPos: Position = [...currentPos];
      switch (instruction.direction) {
        case 'R':
          nextPos[0] += instruction.value;
          break;
        case 'L':
          nextPos[0] -= instruction.value;
          break;
        case 'U':
          nextPos[1] -= instruction.value;
          break;
        case 'D':
          nextPos[1] += instruction.value;
          break;
        default:
          break;
      }
      polygon.push(nextPos);
    });
    return polygon;
  };

  private calcArea = (polygon: Array<Position>): number => {
    let area = 0;
    // using shoelace formula / Gauss's area formula
    polygon.forEach((_, i) => {
      const j = (i + 1) % polygon.length;
      area += polygon[i][0] * polygon[j][1];
      area -= polygon[j][0] * polygon[i][1];
    });
    area += this.instructions.reduce((sum, instruction) => sum + instruction.value, 0);
    area = Math.floor(Math.abs(area) / 2) + 1;
    return area;
  };
}
