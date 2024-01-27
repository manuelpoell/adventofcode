import { Day1 } from '../challenges';

test('AoC 2023 Day 1 Part 1', () => {
  const input = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet';
  const partTwo = false;

  const result = new Day1(input, partTwo).solve();

  expect(result).toBe(142);
});

test('AoC 2023 Day 1 Part 2', () => {
  const input = 'two1nine\neightwothree\nabcone2threexyz\nxtwone53four\n4nineeightseven2\nzoneight234\n7pqrstsixteen';
  const partTwo = true;

  const result = new Day1(input, partTwo).solve();

  expect(result).toBe(281);
});
