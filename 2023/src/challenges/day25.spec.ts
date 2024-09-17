import { Day25 } from './day25';

test('AoC 2023 Day 25 Part 1', () => {
  const input =
    'jqt: rhn xhk nvd\nrsh: frs pzl lsr\nxhk: hfx\ncmg: qnr nvd lhk bvb\nrhn: xhk bvb hfx\nbvb: xhk hfx\npzl: lsr hfx nvd\nqnr: nvd\nntq: jqt hfx bvb xhk\nnvd: lhk\nlsr: lhk\nrzs: qnr cmg lsr rsh\nfrs: qnr lhk lsr';
  const partTwo = false;

  const challenge = new Day25(input, partTwo);
  const result = challenge.solve();

  expect(result).toBe(54);
});
