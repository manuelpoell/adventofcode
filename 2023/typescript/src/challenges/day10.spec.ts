import { Day10 } from './day10';

test('AoC 2023 Day 10 Part 1', () => {
  const input = '..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...';
  const partTwo = false;

  const result = new Day10(input, partTwo).solve();

  expect(result).toBe(8);
});

test('AoC 2023 Day 10 Part 2', () => {
  const input =
    'FF7FSF7F7F7F7F7F---7\nL|LJ||||||||||||F--J\nFL-7LJLJ||||||LJL-77\nF--JF--7||LJLJ7F7FJ-\nL---JF-JLJ.||-FJLJJ7\n|F|F-JF---7F7-L7L|7|\n|FFJF7L7F-JF7|JL---7\n7-L-JL7||F7|L7F-7F7|\nL.L7LFJ|||||FJL7||LJ\nL7JLJL-JLJLJL--JLJ.L';
  const partTwo = true;

  const result = new Day10(input, partTwo).solve();

  expect(result).toBe(10);
});
