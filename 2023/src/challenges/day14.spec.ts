import { Day14 } from './day14';

test('AoC 2023 Day 14 Part 1', () => {
  const input =
    'O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....';
  const partTwo = false;

  const result = new Day14(input, partTwo).solve();

  expect(result).toBe(136);
});

test('AoC 2023 Day 14 Part 2', () => {
  const input =
    'O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....';
  const partTwo = true;

  const result = new Day14(input, partTwo).solve();

  expect(result).toBe(64);
});
