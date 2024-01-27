import { Day8 } from './day8';

test('AoC 2023 Day 8 Part 1', () => {
  const input =
    'RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)';
  const partTwo = false;

  const result = new Day8(input, partTwo).solve();

  expect(result).toBe(2);
});

test('AoC 2023 Day 8 Part 2', () => {
  const input =
    'LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)';
  const partTwo = true;

  const result = new Day8(input, partTwo).solve();

  expect(result).toBe(6);
});
