import {program} from 'commander';
import * as fs from 'fs/promises';

interface Race {
  duration: number;
  distance: number;
}

class Challenge {
  races: Array<Race> = [];

  constructor(input: string, extra: boolean = false) {
    const lines = input.split('\n');
    let durations = [...lines[0].matchAll(/\d+/g)].map((match) => match[0]);
    let distances = [...lines[1].matchAll(/\d+/g)].map((match) => match[0]);
    if (extra) {
      durations = [durations.join('')];
      distances = [distances.join('')];
    }
    durations.forEach((duration, i) => {
      this.races.push({duration: +duration, distance: +distances[i]});
    });
  }

  solve = (): number => {
    return this.races
      .map(this.calcWinningHoldingTimes)
      .reduce((sum, val) => sum * val, 1);
  }

  private calcWinningHoldingTimes = (race: Race): number => {
    let minHoldingTime = 1;
    let maxHoldingTime = race.duration - 1;

    for (let i = 1; i <= race.duration - 1; i++) {
      if (this.isWinningTime(i, race.duration, race.distance)) {
        minHoldingTime = i;
        break;
      }
    }
    for (let i = race.duration - 1; i >= 1; i--) {
      if (this.isWinningTime(i, race.duration, race.distance)) {
        maxHoldingTime = i;
        break;
      }
    }
    return Math.abs(minHoldingTime - maxHoldingTime) + 1;
  }

  private isWinningTime = (holdingTime: number, totalDuration: number, minDistance: number): boolean => {
    return (totalDuration - holdingTime) * holdingTime > minDistance;
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

      const challenge = new Challenge(content, extra);
      console.log(challenge.solve());
    })
    .catch(() => console.log(`failed to parse file ${file}`));
};
main();
