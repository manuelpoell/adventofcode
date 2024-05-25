import { Day13 } from './day13';

test('AoC 2023 Day 13 Part 1', () => {
  const input =
    '#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#';
  const partTwo = false;

  const result = new Day13(input, partTwo).solve();

  expect(result).toBe(405);
});

test('AoC 2023 Day 13 Part 2', () => {
  const input =
    '#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#';
  const partTwo = true;

  const result = new Day13(input, partTwo).solve();

  expect(result).toBe(400);
});
