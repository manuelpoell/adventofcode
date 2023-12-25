import {program} from 'commander';
import * as fs from 'fs/promises';

interface ScratchCard {
  id: number;
  winningNumbers: Array<string>;
  myNumbers: Array<string>;
  count: number;
}

class Challenge {
  lines: Array<string>;

  constructor(input: string) {
    this.lines = input.split('\n');
  }

  partOne = (): number => {
    return this.lines
      .map(this.calcPoints)
      .reduce((sum, value) => sum + value, 0);
  }

  partTwo = (): number => {
    const scratchCards = this.lines.map(this.toScratchCard);
    for (const card of scratchCards) {
      const matching = this.getMatchingNumbers(card);
      matching.forEach((_, i) => {
        const nextId = card.id + i;
        if (!scratchCards[nextId]) return;
        scratchCards[nextId].count += card.count;
      });
    }
    return scratchCards.reduce((sum, card) => sum + card.count, 0);
  }

  private calcPoints = (card: string): number => {
    let points = 0;
    const matches = this.getMatchingNumbers(this.toScratchCard(card));
    matches.forEach((_, i) => {
      if (i === 0) {
        points = 1;
        return;
      }
      points = points * 2;
    });
    return points;
  }

  private toScratchCard = (cardStr: string): ScratchCard => {
    const id = parseInt(cardStr.split(':')[0].replace(/\D/g, ''));
    const numbers = cardStr.split(':')[1].split('|');
    const winningNumbers = numbers[0].split(' ').map((num) => num.trim()).filter((num) => num.length > 0);
    const myNumbers = numbers[1].split(' ').map((num) => num.trim()).filter((num) => num.length > 0);
    return {id, winningNumbers, myNumbers, count: 1};
  }

  private getMatchingNumbers = (scratchCard: ScratchCard): Array<string> => {
    return scratchCard.myNumbers.filter((myNum) => scratchCard.winningNumbers.includes(myNum));
  }
}

export const main = () => {
  program
    .option('-f, --file <filepath>', 'Path to input file', '../input.txt')
    .option('-e, --extra', 'Enable functions for part two', false)
    .parse();
  const {file, extra} = program.opts<{ file: string, extra: boolean }>();

  fs.readFile(file, 'utf-8')
    .then((content) => {
      if (!content) {
        console.log(`failed to read content of ${file}`);
        return;
      }

      const challenge = new Challenge(content);
      const result = extra ? challenge.partTwo() : challenge.partOne();
      console.log(result);
    })
    .catch(() => console.log(`failed to parse file ${file}`));
};
main();
