import {program} from 'commander';
import * as fs from 'fs/promises';

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

interface Game {
  id: number;
  sets: Array<{
    red: number;
    green: number;
    blue: number;
  }>;
}

class Challenge {
  games: Array<Game>;

  constructor(input: string) {
    this.games = input.split('\n').map((line) => {
      const game = line.split(':');
      return {
        id: parseInt(game[0]?.split(' ')[1] ?? '0'),
        sets: game[1].split(';').map((set) => {
          const cubes = set.split(',');
          return {
            red: parseInt(cubes.find((entry) => entry.includes('red'))?.replace(/\D/g, '') ?? '0'),
            green: parseInt(cubes.find((entry) => entry.includes('green'))?.replace(/\D/g, '') ?? '0'),
            blue: parseInt(cubes.find((entry) => entry.includes('blue'))?.replace(/\D/g, '') ?? '0'),
          };
        }),
      };
    });
  }

  partOne(): number {
    const validGames = this.games.filter(
      (game) => game.sets.every(
        (set) => set.red <= MAX_RED && set.green <= MAX_GREEN && set.blue <= MAX_BLUE
      )
    );

    let sum = 0;
    validGames.forEach((game) => sum += game.id);
    return sum;
  }

  partTwo(): number {
    const minSets = this.games.map((game) => {
      const minSet = {red: 0, green: 0, blue: 0};
      game.sets.forEach((set) => {
        minSet.red = set.red > minSet.red ? set.red : minSet.red;
        minSet.green = set.green > minSet.green ? set.green : minSet.green;
        minSet.blue = set.blue > minSet.blue ? set.blue : minSet.blue;
      });
      return minSet;
    });

    let sum = 0;
    const products = minSets.map((set) => set.red * set.green * set.blue);
    products.forEach((product) => sum += product);
    return sum;
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
    .catch(() => {
      console.log(`failed to open file ${file}`);
    });
};
main();
