import { Day16 } from './day16';

test('AoC 2023 Day 16 Part 1', () => {
  const input =
    '.|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....';
  const partTwo = false;

  const result = new Day16(input, partTwo).solve();

  expect(result).toBe(46);
});

test('AoC 2023 Day 16 Part 2', () => {
  const input =
    '.|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....';
  const partTwo = true;

  const result = new Day16(input, partTwo).solve();

  expect(result).toBe(51);
});
