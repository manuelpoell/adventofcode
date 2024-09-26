import { program } from 'commander';
import fs from 'fs';
import {
  Challenge,
  Day1,
  Day10,
  Day11,
  Day12,
  Day13,
  Day14,
  Day15,
  Day16,
  Day17,
  Day18,
  Day19,
  Day20,
  Day21,
  Day22,
  Day23,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  Day7,
  Day8,
  Day9,
  Day24,
  Day25,
} from './challenges';

export const main = () => {
  program
    .option('-d, --day <dayNumber>', 'Specify number of day to solve', '0')
    .option('-f, --file <filepath>', 'Path to input file', './input.txt')
    .option('-p, --partTwo', 'Enable functions for part two', false)
    .parse();
  const { day, file, partTwo } = program.opts<{ day: string; file: string; partTwo: boolean }>();

  let content: string = '';
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    console.log(e);
    return;
  }

  if (!content) {
    console.log(`failed to read content of ${file}`);
    return;
  }

  let challenge: Challenge | null = null;
  switch (day) {
    case '1':
      challenge = new Day1(content, partTwo);
      break;
    case '2':
      challenge = new Day2(content, partTwo);
      break;
    case '3':
      challenge = new Day3(content, partTwo);
      break;
    case '4':
      challenge = new Day4(content, partTwo);
      break;
    case '5':
      challenge = new Day5(content, partTwo);
      break;
    case '6':
      challenge = new Day6(content, partTwo);
      break;
    case '7':
      challenge = new Day7(content, partTwo);
      break;
    case '8':
      challenge = new Day8(content, partTwo);
      break;
    case '9':
      challenge = new Day9(content, partTwo);
      break;
    case '10':
      challenge = new Day10(content, partTwo);
      break;
    case '11':
      challenge = new Day11(content, partTwo);
      break;
    case '12':
      challenge = new Day12(content, partTwo);
      break;
    case '13':
      challenge = new Day13(content, partTwo);
      break;
    case '14':
      challenge = new Day14(content, partTwo);
      break;
    case '15':
      challenge = new Day15(content, partTwo);
      break;
    case '16':
      challenge = new Day16(content, partTwo);
      break;
    case '17':
      challenge = new Day17(content, partTwo);
      break;
    case '18':
      challenge = new Day18(content, partTwo);
      break;
    case '19':
      challenge = new Day19(content, partTwo);
      break;
    case '20':
      challenge = new Day20(content, partTwo);
      break;
    case '21':
      challenge = new Day21(content, partTwo);
      break;
    case '22':
      challenge = new Day22(content, partTwo);
      break;
    case '23':
      challenge = new Day23(content, partTwo);
      break;
    case '24':
      challenge = new Day24(content, partTwo);
      break;
    case '25':
      challenge = new Day25(content, partTwo);
      break;
  }

  console.log(challenge?.solve() ?? `Day ${day} not found`);
};
main();
