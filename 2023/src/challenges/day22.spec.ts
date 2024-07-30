import { Day22 } from './day22';

test('AoC 2023 Day 22 Part 1', () => {
  const input = '1,0,1~1,2,1\n0,0,2~2,0,2\n0,2,3~2,2,3\n0,0,4~0,2,4\n2,0,5~2,2,5\n0,1,6~2,1,6\n1,1,8~1,1,9';
  const partTwo = false;

  const challenge = new Day22(input, partTwo);
  const result = challenge.solve();

  expect(result).toBe(5);
});

test('AoC 2023 Day 22 Part 2', () => {
  const input = '1,0,1~1,2,1\n0,0,2~2,0,2\n0,2,3~2,2,3\n0,0,4~0,2,4\n2,0,5~2,2,5\n0,1,6~2,1,6\n1,1,8~1,1,9';
  const partTwo = true;

  const challenge = new Day22(input, partTwo);
  const result = challenge.solve();

  expect(result).toBe(7);
});
