import { Challenge } from './challenge';

interface Race {
  duration: number;
  distance: number;
}

export class Day6 extends Challenge {
  races: Array<Race> = [];

  constructor(input: string, partTwo: boolean) {
    super();
    const lines = input.split('\n');
    let durations = [...lines[0].matchAll(/\d+/g)].map((match) => match[0]);
    let distances = [...lines[1].matchAll(/\d+/g)].map((match) => match[0]);
    if (partTwo) {
      durations = [durations.join('')];
      distances = [distances.join('')];
    }
    durations.forEach((duration, i) => {
      this.races.push({ duration: +duration, distance: +distances[i] });
    });
  }

  solve = (): number => {
    return this.races.map(this.calcWinningHoldingTimes).reduce((sum, val) => sum * val, 1);
  };

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
  };

  private isWinningTime = (holdingTime: number, totalDuration: number, minDistance: number): boolean => {
    return (totalDuration - holdingTime) * holdingTime > minDistance;
  };
}
