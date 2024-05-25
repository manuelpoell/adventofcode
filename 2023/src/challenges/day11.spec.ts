import { Day11 } from './day11';

test('AoC 2023 Day 11 Part 1', () => {
  const input =
    '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....';
  const partTwo = false;

  const result = new Day11(input, partTwo).solve();

  expect(result).toBe(374);
});

test('AoC 2023 Day 11 Part 2', () => {
  const input =
    '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....';
  const partTwo = true;

  const result = new Day11(input, partTwo).solve();

  expect(result).toBe(82000210);
});
