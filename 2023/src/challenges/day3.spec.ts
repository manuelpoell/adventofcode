import { Day3 } from './day3';

test('AoC 2023 Day 3 Part 1', () => {
  const input =
    '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..';
  const partTwo = false;

  const result = new Day3(input, partTwo).solve();

  expect(result).toBe(4361);
});

test('AoC 2023 Day 3 Part 2', () => {
  const input =
    '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..';
  const partTwo = true;

  const result = new Day3(input, partTwo).solve();

  expect(result).toBe(467835);
});
