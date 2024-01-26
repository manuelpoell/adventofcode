import { Challenge } from './challenge';

interface Hand {
  cards: Array<string>;
  score: number;
}

export class Day7 extends Challenge {
  partTwo: boolean;
  hands: Array<Hand> = [];
  cardMap = new Map<string, number>([
    ['A', 0],
    ['K', 1],
    ['Q', 2],
    ['J', 3],
    ['T', 4],
    ['9', 5],
    ['8', 6],
    ['7', 7],
    ['6', 8],
    ['5', 9],
    ['4', 10],
    ['3', 11],
    ['2', 12],
    ['J', 13],
  ]);

  constructor(input: string, partTwo: boolean) {
    super();
    const lines = input.split('\n');
    lines.forEach((line) => {
      const elements = line.split(' ');
      this.hands.push({ cards: elements[0].split(''), score: +elements[1] });
    });
    this.partTwo = partTwo;
  }

  solve = (): number => {
    return this.hands
      .sort((a, b) => this.compareHands(a, b, this.partTwo))
      .reduce((sum, hand, i) => sum + hand.score * (i + 1), 0);
  };

  private compareHands = (a: Hand, b: Hand, extra?: boolean): number => {
    const comp = this.determineType(b.cards, extra) - this.determineType(a.cards, extra);
    if (comp !== 0) return comp;
    return this.determineHighCardOrder(a.cards, b.cards);
  };

  private determineType = (cards: Array<string>, extra?: boolean): number => {
    const cardCount = cards.reduce((count: { [key: string]: number }, card) => {
      if (!count[card]) {
        count[card] = 1;
      } else {
        count[card] += 1;
      }
      return count;
    }, {});

    if (extra && cardCount['J']) {
      const highestCount = Object.entries(cardCount).reduce(
        (max, entry) => (entry[0] !== 'J' && entry[1] > max[1] ? entry : max),
        ['', 0],
      );
      if (highestCount[0]) {
        cardCount[highestCount[0]] += cardCount['J'];
        delete cardCount['J'];
      }
    }

    const existingCards = Object.keys(cardCount);
    if (existingCards.length === 1) return 1;
    if (existingCards.some((card) => cardCount[card] === 4)) return 2;
    if (existingCards.length === 2) return 3;
    if (existingCards.length === 3 && existingCards.some((card) => cardCount[card] === 3)) return 4;
    if (existingCards.length === 3) return 5;
    if (existingCards.length === 4) return 6;
    return 7;
  };

  private determineHighCardOrder = (a: Array<string>, b: Array<string>, index: number = 0): number => {
    if (index > a.length - 1) return 0;
    if (a[index] === b[index]) return this.determineHighCardOrder(a, b, index + 1);
    return this.cardMap.get(b[index])! - this.cardMap.get(a[index])!;
  };
}
