import {program} from 'commander';
import * as fs from 'fs/promises';

interface Hand {
  cards: Array<string>;
  score: number;
}

class Challenge {
  hands: Array<Hand> = [];
  cardMap = new Map<string, number>([
    ["A", 0],
    ["K", 1],
    ["Q", 2],
    ["J", 3],
    ["T", 4],
    ["9", 5],
    ["8", 6],
    ["7", 7],
    ["6", 8],
    ["5", 9],
    ["4", 10],
    ["3", 11],
    ["2", 12],
    ["J", 13],
  ]);

  constructor(input: string) {
    const lines = input.split('\n');
    lines.forEach((line) => {
      const elements = line.split(' ');
      this.hands.push({cards: elements[0].split(''), score: +elements[1]});
    });
  }

  solve = (extra?: boolean): number => {
    return this.hands
      .sort((a, b) => this.compareHands(a, b, extra))
      .reduce((sum, hand, i) => sum + hand.score * (i + 1), 0);
  }

  private compareHands = (a: Hand, b: Hand, extra?: boolean): number => {
    const comp = this.determineType(b.cards, extra) - this.determineType(a.cards, extra);
    if (comp !== 0) return comp;
    return this.determineHighCardOrder(a.cards, b.cards);
  }

  private determineType = (cards: Array<string>, extra?: boolean): number => {
    const cardCount = cards
      .reduce((count: { [key: string]: number }, card) => {
        if (!count[card]) {
          count[card] = 1;
        } else {
          count[card] += 1;
        }
        return count;
      }, {});

    if (extra && cardCount['J']) {
      const highestCount = Object.entries(cardCount)
        .reduce((max, entry) => entry[0] !== 'J' && entry[1] > max[1] ? entry : max, ['', 0]);
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
  }

  private determineHighCardOrder = (a: Array<string>, b: Array<string>, index: number = 0): number => {
    if (index > a.length - 1) return 0;
    if (a[index] === b[index]) return this.determineHighCardOrder(a, b, index + 1);
    return this.cardMap.get(b[index])! - this.cardMap.get(a[index])!;
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
      console.log(challenge.solve(extra));
    })
    .catch(() => console.log(`failed to parse file ${file}`));
};
main();
