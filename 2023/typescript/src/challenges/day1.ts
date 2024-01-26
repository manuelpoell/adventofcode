import { Challenge } from './challenge';

export class Day1 extends Challenge {
  private partTwo: boolean;
  private lines: Array<string>;

  constructor(input: string, partTwo: boolean) {
    super();
    this.lines = input.split('\n');
    this.partTwo = partTwo;
  }

  solve = (): number => {
    return this.lines
      .map((line) => {
        const numbers = this.extractNumbers(line);
        return parseInt(numbers.slice(0, 1) + numbers.slice(-1));
      })
      .reduce((sum, num) => sum + num, 0);
  };

  private extractNumbers = (line: string): string => {
    let tempLine = line;

    if (this.partTwo) {
      for (let i = 0; i < tempLine.length; i++) {
        let num: string = '';
        switch (true) {
          case tempLine.slice(i).startsWith('one'):
            num = '1';
            break;
          case tempLine.slice(i).startsWith('two'):
            num = '2';
            break;
          case tempLine.slice(i).startsWith('three'):
            num = '3';
            break;
          case tempLine.slice(i).startsWith('four'):
            num = '4';
            break;
          case tempLine.slice(i).startsWith('five'):
            num = '5';
            break;
          case tempLine.slice(i).startsWith('six'):
            num = '6';
            break;
          case tempLine.slice(i).startsWith('seven'):
            num = '7';
            break;
          case tempLine.slice(i).startsWith('eight'):
            num = '8';
            break;
          case tempLine.slice(i).startsWith('nine'):
            num = '9';
            break;
        }
        if (!num) continue;

        const temp = tempLine.split('');
        temp[i] = num;
        tempLine = temp.join('');
      }
    }
    return tempLine.replace(/\D/g, '');
  };
}
