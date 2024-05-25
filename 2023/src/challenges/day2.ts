import { Challenge } from './challenge';

interface Game {
  id: number;
  sets: Array<{
    red: number;
    green: number;
    blue: number;
  }>;
}

export class Day2 extends Challenge {
  private partTwo: boolean;
  private games: Array<Game>;
  private readonly maxRed = 12;
  private readonly maxGreen = 13;
  private readonly maxBlue = 14;

  constructor(input: string, partTwo: boolean) {
    super();
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
    this.partTwo = partTwo;
  }

  solve = (): number => {
    return this.partTwo ? this.solveTwo() : this.solveOne();
  };

  private solveOne = (): number => {
    return this.games
      .filter((game) =>
        game.sets.every((set) => set.red <= this.maxRed && set.green <= this.maxGreen && set.blue <= this.maxBlue),
      )
      .reduce((sum, game) => sum + game.id, 0);
  };
  private solveTwo = (): number => {
    return this.games
      .map((game) => {
        const minSet = { red: 0, green: 0, blue: 0 };
        game.sets.forEach((set) => {
          minSet.red = set.red > minSet.red ? set.red : minSet.red;
          minSet.green = set.green > minSet.green ? set.green : minSet.green;
          minSet.blue = set.blue > minSet.blue ? set.blue : minSet.blue;
        });
        return minSet;
      })
      .map((set) => set.red * set.green * set.blue)
      .reduce((sum, product) => sum + product, 0);
  };
}
