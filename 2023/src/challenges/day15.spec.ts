import { Day15 } from './day15';

test('AoC 2023 Day 15 Part 1', () => {
  const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';
  const partTwo = false;

  const result = new Day15(input, partTwo).solve();

  expect(result).toBe(1320);
});

test('AoC 2023 Day 15 Part 2', () => {
  const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';
  const partTwo = true;

  const result = new Day15(input, partTwo).solve();

  expect(result).toBe(145);
});
