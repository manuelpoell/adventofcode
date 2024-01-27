import { Day6 } from './day6';

test('AoC 2023 Day 6 Part 1', () => {
  const input = 'Time:      7  15   30\nDistance:  9  40  200';
  const partTwo = false;

  const result = new Day6(input, partTwo).solve();

  expect(result).toBe(288);
});

test('AoC 2023 Day 6 Part 2', () => {
  const input = 'Time:      7  15   30\nDistance:  9  40  200';
  const partTwo = true;

  const result = new Day6(input, partTwo).solve();

  expect(result).toBe(71503);
});
