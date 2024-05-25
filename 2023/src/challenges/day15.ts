import { Challenge } from './challenge';

export class Day15 extends Challenge {
  partTwo: boolean;
  initSequence: Array<string>;
  private boxes: Array<Array<string>> = new Array(256).fill([]);

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.initSequence = input.split(',');
  }

  solve = (): number => {
    if (this.partTwo) {
      this.fillBoxesWithLenses();
      return this.boxes
        .map((box, i) => {
          let value = 0;
          if (box.length === 0) return value;
          box.forEach((lense, j) => {
            value += (i + 1) * (j + 1) * +lense.replace(/^\D+/g, '');
          });
          return value;
        })
        .reduce((sum, value) => sum + value, 0);
    } else {
      return this.initSequence.map(this.calcHashValue).reduce((sum, value) => sum + value, 0);
    }
  };

  private fillBoxesWithLenses = (): void => {
    this.initSequence.forEach((step) => {
      const label = step.replace(/[^a-z]+/g, '');
      const operation = step.replace(/[^=-]/g, '');
      const focalLength = step.replace(/\D/g, '');
      const boxIndex = this.calcHashValue(label);
      let lenses = [...this.boxes[boxIndex]];

      if (operation === '-') {
        lenses = lenses.filter((lense) => !lense.startsWith(label));
      } else if (operation === '=') {
        const lense = `${label} ${focalLength}`;
        const existingLenseIndex = lenses.findIndex((lense) => lense.startsWith(label));
        if (existingLenseIndex > -1) {
          lenses[existingLenseIndex] = lense;
        } else {
          lenses.push(lense);
        }
      }
      this.boxes[boxIndex] = [...lenses];
    });
  };

  private calcHashValue = (input: string): number => {
    let hashValue = 0;
    for (const char of input.split('')) {
      hashValue += char.charCodeAt(0);
      hashValue *= 17;
      hashValue = hashValue % 256;
    }
    return hashValue;
  };
}
