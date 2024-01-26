import { Challenge } from './challenge';

interface ScratchCard {
  id: number;
  winningNumbers: Array<string>;
  myNumbers: Array<string>;
  count: number;
}

export class Day4 extends Challenge {
  private partTwo: boolean;
  private lines: Array<string>;

  constructor(input: string, partTwo: boolean) {
    super();
    this.lines = input.split('\n');
    this.partTwo = partTwo;
  }

  solve = (): number => {
    return this.partTwo ? this.solveTwo() : this.solveOne();
  };

  solveOne = (): number => {
    return this.lines.map(this.calcPoints).reduce((sum, value) => sum + value, 0);
  };

  solveTwo = (): number => {
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
  };

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
  };

  private toScratchCard = (cardStr: string): ScratchCard => {
    const id = parseInt(cardStr.split(':')[0].replace(/\D/g, ''));
    const numbers = cardStr.split(':')[1].split('|');
    const winningNumbers = numbers[0]
      .split(' ')
      .map((num) => num.trim())
      .filter((num) => num.length > 0);
    const myNumbers = numbers[1]
      .split(' ')
      .map((num) => num.trim())
      .filter((num) => num.length > 0);
    return { id, winningNumbers, myNumbers, count: 1 };
  };

  private getMatchingNumbers = (scratchCard: ScratchCard): Array<string> => {
    return scratchCard.myNumbers.filter((myNum) => scratchCard.winningNumbers.includes(myNum));
  };
}
