import { program } from 'commander';
import fs from 'fs';

import { main } from './main';
import {
  Day1,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  Day7,
  Day8,
  Day9,
  Day10,
  Day11,
  Day12,
  Day13,
  Day14,
  Day15,
  Day16,
  Day17,
  Day18,
  Day19,
  Day20,
  Day21,
  Day22,
  Day23,
  Day24,
  Day25,
} from './challenges';

jest.mock('./challenges', () => ({
  Day1: jest.fn(() => ({ solve: jest.fn() })),
  Day2: jest.fn(() => ({ solve: jest.fn() })),
  Day3: jest.fn(() => ({ solve: jest.fn() })),
  Day4: jest.fn(() => ({ solve: jest.fn() })),
  Day5: jest.fn(() => ({ solve: jest.fn() })),
  Day6: jest.fn(() => ({ solve: jest.fn() })),
  Day7: jest.fn(() => ({ solve: jest.fn() })),
  Day8: jest.fn(() => ({ solve: jest.fn() })),
  Day9: jest.fn(() => ({ solve: jest.fn() })),
  Day10: jest.fn(() => ({ solve: jest.fn() })),
  Day11: jest.fn(() => ({ solve: jest.fn() })),
  Day12: jest.fn(() => ({ solve: jest.fn() })),
  Day13: jest.fn(() => ({ solve: jest.fn() })),
  Day14: jest.fn(() => ({ solve: jest.fn() })),
  Day15: jest.fn(() => ({ solve: jest.fn() })),
  Day16: jest.fn(() => ({ solve: jest.fn() })),
  Day17: jest.fn(() => ({ solve: jest.fn() })),
  Day18: jest.fn(() => ({ solve: jest.fn() })),
  Day19: jest.fn(() => ({ solve: jest.fn() })),
  Day20: jest.fn(() => ({ solve: jest.fn() })),
  Day21: jest.fn(() => ({ solve: jest.fn() })),
  Day22: jest.fn(() => ({ solve: jest.fn() })),
  Day23: jest.fn(() => ({ solve: jest.fn() })),
  Day24: jest.fn(() => ({ solve: jest.fn() })),
  Day25: jest.fn(() => ({ solve: jest.fn() })),
}));

describe('main', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('<INPUT HERE>');
  });

  test('exit early on missing file content', () => {
    jest.spyOn(fs, 'readFileSync').mockRestore();
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('');
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '1', file: './input.txt', partTwo: false });
    console.log = jest.fn();

    main();
    expect(console.log).toHaveBeenLastCalledWith('failed to read content of ./input.txt');
  });

  test('exit with notification of day not implemented', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '0', file: './input.txt', partTwo: false });
    console.log = jest.fn();

    main();
    expect(console.log).toHaveBeenLastCalledWith('Day 0 not found');
  });

  test('Init Day 1', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '1', file: './input.txt', partTwo: false });

    main();
    expect(Day1).toHaveBeenCalled();
  });

  test('Init Day 2', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '2', file: './input.txt', partTwo: false });

    main();
    expect(Day2).toHaveBeenCalled();
  });

  test('Init Day 3', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '3', file: './input.txt', partTwo: false });

    main();
    expect(Day3).toHaveBeenCalled();
  });

  test('Init Day 4', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '4', file: './input.txt', partTwo: false });

    main();
    expect(Day4).toHaveBeenCalled();
  });

  test('Init Day 5', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '5', file: './input.txt', partTwo: false });

    main();
    expect(Day5).toHaveBeenCalled();
  });

  test('Init Day 6', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '6', file: './input.txt', partTwo: false });

    main();
    expect(Day6).toHaveBeenCalled();
  });

  test('Init Day 7', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '7', file: './input.txt', partTwo: false });

    main();
    expect(Day7).toHaveBeenCalled();
  });

  test('Init Day 8', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '8', file: './input.txt', partTwo: false });

    main();
    expect(Day8).toHaveBeenCalled();
  });

  test('Init Day 9', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '9', file: './input.txt', partTwo: false });

    main();
    expect(Day9).toHaveBeenCalled();
  });

  test('Init Day 10', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '10', file: './input.txt', partTwo: false });

    main();
    expect(Day10).toHaveBeenCalled();
  });

  test('Init Day 11', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '11', file: './input.txt', partTwo: false });

    main();
    expect(Day11).toHaveBeenCalled();
  });

  test('Init Day 12', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '12', file: './input.txt', partTwo: false });

    main();
    expect(Day12).toHaveBeenCalled();
  });

  test('Init Day 13', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '13', file: './input.txt', partTwo: false });

    main();
    expect(Day13).toHaveBeenCalled();
  });

  test('Init Day 14', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '14', file: './input.txt', partTwo: false });

    main();
    expect(Day14).toHaveBeenCalled();
  });

  test('Init Day 15', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '15', file: './input.txt', partTwo: false });

    main();
    expect(Day15).toHaveBeenCalled();
  });

  test('Init Day 16', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '16', file: './input.txt', partTwo: false });

    main();
    expect(Day16).toHaveBeenCalled();
  });

  test('Init Day 17', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '17', file: './input.txt', partTwo: false });

    main();
    expect(Day17).toHaveBeenCalled();
  });

  test('Init Day 18', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '18', file: './input.txt', partTwo: false });

    main();
    expect(Day18).toHaveBeenCalled();
  });

  test('Init Day 19', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '19', file: './input.txt', partTwo: false });

    main();
    expect(Day19).toHaveBeenCalled();
  });

  test('Init Day 20', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '20', file: './input.txt', partTwo: false });

    main();
    expect(Day20).toHaveBeenCalled();
  });

  test('Init Day 21', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '21', file: './input.txt', partTwo: false });

    main();
    expect(Day21).toHaveBeenCalled();
  });

  test('Init Day 22', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '22', file: './input.txt', partTwo: false });

    main();
    expect(Day22).toHaveBeenCalled();
  });

  test('Init Day 23', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '23', file: './input.txt', partTwo: false });

    main();
    expect(Day23).toHaveBeenCalled();
  });

  test('Init Day 24', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '24', file: './input.txt', partTwo: false });

    main();
    expect(Day24).toHaveBeenCalled();
  });

  test('Init Day 25', () => {
    jest.spyOn(program, 'opts').mockReturnValueOnce({ day: '25', file: './input.txt', partTwo: false });

    main();
    expect(Day25).toHaveBeenCalled();
  });
});
