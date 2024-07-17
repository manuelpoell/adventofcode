import { Day21 } from './day21';

test('AoC 2023 Day 21 Part 1', () => {
  const input =
    '...........\n.....###.#.\n.###.##..#.\n..#.#...#..\n....#.#....\n.##..S####.\n.##..#...#.\n.......##..\n.##.#.####.\n.##..##.##.\n...........';
  const partTwo = false;

  const challenge = new Day21(input, partTwo);
  challenge.steps = 6;
  const result = challenge.solve();

  expect(result).toBe(16);
});
