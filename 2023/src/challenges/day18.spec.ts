import { Day18 } from './day18';

test('AoC 2023 Day 18 Part 1', () => {
  const input =
    'R 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)';
  const partTwo = false;

  const result = new Day18(input, partTwo).solve();

  expect(result).toBe(62);
});

test('AoC 2023 Day 18 Part 2', () => {
  const input =
    'R 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)';
  const partTwo = true;

  const result = new Day18(input, partTwo).solve();

  expect(result).toBe(952408144115);
});
