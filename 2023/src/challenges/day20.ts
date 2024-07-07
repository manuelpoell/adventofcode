import { Challenge } from './challenge';

type ModuleType = '%' | '&' | 'output' | 'broadcast' | 'button';
type ModuleSignal = 0 | 1;

class Module {
  name: string;
  type: ModuleType;
  inputs: Array<string> = [];
  outputs: Array<string> = [];
  memory = new Map<string, ModuleSignal>();

  constructor(config: string) {
    const elements = config.split('->').map((el) => el.trim());
    if (['%', '&'].includes(elements[0][0])) {
      this.type = elements[0].slice(0, 1) as ModuleType;
      this.name = elements[0].slice(1);
    } else {
      this.type = elements[0] === 'broadcaster' ? 'broadcast' : 'output';
      this.name = elements[0];
    }
    this.outputs = elements[1].split(', ').map((name) => name.trim());
  }

  processInput = (
    signal: ModuleSignal,
    from: string,
  ): Array<[source: string, destination: string, signal: ModuleSignal]> => {
    const source = this.name;
    switch (this.type) {
      case '%':
        if (signal === 1) return [];
        this.memory.set(this.name, this.memory.get(this.name) === 0 ? 1 : 0);
        return this.outputs.map((out) => [source, out, this.memory.get(this.name)!]);
      case '&':
        this.memory.set(from, signal);
        const sendSignal = [...this.memory.values()].every((value) => value === 1) ? 0 : 1;
        return this.outputs.map((out) => [source, out, sendSignal]);
      case 'broadcast':
        return this.outputs.map((out) => [source, out, signal]);
      default:
        return [];
    }
  };
}

export class Day20 extends Challenge {
  partTwo: boolean;
  modules: Array<Module> = [];
  private lowCount: number = 0;
  private highCount: number = 0;
  private buttonCount: number = 0;
  private sourceButtonCount: { [key: string]: Array<number> } = {};

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.modules = input
      .trim()
      .split('\n')
      .map((line) => new Module(line));
  }

  solve = (): number => {
    this.populateModuleInputs();
    if (!this.partTwo) {
      for (let i = 0; i < 1000; i++) {
        this.buttonPush();
      }
      return this.lowCount * this.highCount;
    } else {
      const periods: Array<number> = [];
      const rxSources = this.modules.find((module) => module.outputs.includes('rx'))?.inputs ?? [];
      while (true) {
        this.buttonCount++;
        this.buttonPush(rxSources);
        if (rxSources.every((src) => this.sourceButtonCount[src]?.length > 2)) {
          rxSources.forEach((src) => {
            periods.push(this.sourceButtonCount[src][2] - this.sourceButtonCount[src][1]);
          });
          break;
        }
      }
      return this.lcmOfArray(periods);
    }
  };

  private buttonPush = (rxSources?: Array<string>): void => {
    this.lowCount++;
    const broadcaster = this.modules.find((module) => module.type === 'broadcast')!;
    const queue: Array<[source: string, destination: string, signal: ModuleSignal]> = broadcaster.processInput(
      0,
      'button',
    );

    while (queue.length > 0) {
      const instruction = queue.shift()!;
      const [source, destination, signal] = [...instruction];
      if (rxSources?.includes(source) && signal === 1) {
        if (!this.sourceButtonCount[source]) this.sourceButtonCount[source] = [];
        this.sourceButtonCount[source].push(this.buttonCount);
      }
      const destinationModule = this.modules.find((module) => module.name === destination);
      signal === 0 ? this.lowCount++ : this.highCount++;
      if (!destinationModule) continue;
      queue.push(...destinationModule.processInput(signal, source));
    }
  };

  private populateModuleInputs = (): void => {
    this.modules.forEach((module) => {
      module.inputs = this.modules.filter((mod) => mod.outputs.includes(module.name)).map((mod) => mod.name);
      if (module.type === '&') {
        module.inputs.forEach((input) => {
          module.memory.set(input, 0);
        });
      } else if (module.type === '%') {
        module.memory.set(module.name, 0);
      }
    });
  };

  private lcmOfArray = (numbers: Array<number>): number => {
    let multiple = 1;
    for (let i = 0; i < numbers.length; i++) {
      multiple = this.lcm(multiple, numbers[i]);
    }
    return multiple;
  };

  private lcm = (a: number, b: number): number => {
    return (a * b) / this.gcd(a, b);
  };

  private gcd = (a: number, b: number): number => {
    if (b === 0) return a;
    return this.gcd(b, a % b);
  };
}
