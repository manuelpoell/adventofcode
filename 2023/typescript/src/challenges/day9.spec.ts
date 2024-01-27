import { Day9 } from './day9';

test('AoC 2023 Day 9 Part 1', () => {
  const input = '0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45';
  const partTwo = false;

  const result = new Day9(input, partTwo).solve();

  expect(result).toBe(114);
});

test('AoC 2023 Day 9 Part 2', () => {
  const input = '0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45';
  const partTwo = true;

  const result = new Day9(input, partTwo).solve();

  expect(result).toBe(2);
});
