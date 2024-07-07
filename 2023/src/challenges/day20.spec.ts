import { Day20 } from './day20';

test('AoC 2023 Day 20 Part 1 Example #1', () => {
  const input = 'broadcaster -> a, b, c\n%a -> b\n%b -> c\n%c -> inv\n&inv -> a';
  const partTwo = false;

  const result = new Day20(input, partTwo).solve();

  expect(result).toBe(32000000);
});

test('AoC 2023 Day 20 Part 1 Example #2', () => {
  const input = 'broadcaster -> a\n%a -> inv, con\n&inv -> b\n%b -> con\n&con -> output';
  const partTwo = false;

  const result = new Day20(input, partTwo).solve();

  expect(result).toBe(11687500);
});
