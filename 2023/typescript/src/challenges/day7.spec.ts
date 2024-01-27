import { Day7 } from './day7';

test('AoC 2023 Day 7 Part 1', () => {
  const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483';
  const partTwo = false;

  const result = new Day7(input, partTwo).solve();

  expect(result).toBe(6440);
});

test('AoC 2023 Day 7 Part 2', () => {
  const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483';
  const partTwo = true;

  const result = new Day7(input, partTwo).solve();

  expect(result).toBe(5905);
});
