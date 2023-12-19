import {program} from 'commander';
import * as fs from 'fs/promises';

const extractNumbers = (line: string, readText: boolean): string => {
  let tempLine = line;

  if (readText) {
    for (let i = 0; i < tempLine.length; i++) {
      let num: string = '';
      switch (true) {
        case tempLine.slice(i).startsWith('one'):
          num = '1';
          break;
        case tempLine.slice(i).startsWith('two'):
          num = '2';
          break;
        case tempLine.slice(i).startsWith('three'):
          num = '3';
          break;
        case tempLine.slice(i).startsWith('four'):
          num = '4';
          break;
        case tempLine.slice(i).startsWith('five'):
          num = '5';
          break;
        case tempLine.slice(i).startsWith('six'):
          num = '6';
          break;
        case tempLine.slice(i).startsWith('seven'):
          num = '7';
          break;
        case tempLine.slice(i).startsWith('eight'):
          num = '8';
          break;
        case tempLine.slice(i).startsWith('nine'):
          num = '9';
          break;
      }
      if (!num) continue;

      const temp = tempLine.split('');
      temp[i] = num;
      tempLine = temp.join('');
    }
  }
  return tempLine.replace(/\D/g, '');
};

export const main = () => {
  program
    .option('-f, --file <filepath>', 'Path to input file', '../input.txt')
    .option('-e, --extra', 'Enable functions for part two', false)
    .parse();
  const {file, extra} = program.opts<{ file: string, extra: boolean }>();

  fs.readFile(file, 'utf-8')
    .then((content) => {
      if (!content) {
        console.log(`failed to read content of ${file}`);
        return;
      }

      const lines = content.split('\n');
      const calNumbers: Array<number> = lines.map(
        (line) => {
          const numbers = extractNumbers(line, extra);
          return parseInt(numbers.slice(0, 1) + numbers.slice(-1));
        }
      );

      let sum = 0;
      calNumbers.forEach((num) => sum += num);
      console.log(sum);
    })
    .catch(() => {
      console.log(`failed to open file ${file}`);
    });
};
main();
