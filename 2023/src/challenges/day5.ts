import { Challenge } from './challenge';

interface AlmanacMap {
  destinationStart: number;
  sourceStart: number;
  range: number;
}

interface SeedRange {
  start: number;
  range: number;
}

interface Almanac {
  seeds: Array<number>;
  seedsExtra: Array<SeedRange>;
  seedToSoil: Array<AlmanacMap>;
  soilToFertilizer: Array<AlmanacMap>;
  fertilizerToWater: Array<AlmanacMap>;
  waterToLight: Array<AlmanacMap>;
  lightToTemperature: Array<AlmanacMap>;
  temperatureToHumidity: Array<AlmanacMap>;
  humidityToLocation: Array<AlmanacMap>;
}

export class Day5 extends Challenge {
  partTwo: boolean;
  almanac: Almanac;

  constructor(input: string, partTwo: boolean) {
    super();
    const sections = input.split('\n\n');
    this.almanac = {
      seeds: sections[0]
        .split(' ')
        .slice(1)
        .map((str) => +str),
      seedsExtra: this.getSeedRanges(sections[0]),
      seedToSoil: this.parseMap('seed-to-soil', sections),
      soilToFertilizer: this.parseMap('soil-to-fertilizer', sections),
      fertilizerToWater: this.parseMap('fertilizer-to-water', sections),
      waterToLight: this.parseMap('water-to-light', sections),
      lightToTemperature: this.parseMap('light-to-temperature', sections),
      temperatureToHumidity: this.parseMap('temperature-to-humidity', sections),
      humidityToLocation: this.parseMap('humidity-to-location', sections),
    };
    this.partTwo = partTwo;
  }

  solve = (): number => {
    let lowestLocation: number = Infinity;
    if (!this.partTwo) {
      for (const seed of this.almanac.seeds) {
        const location = this.seedToLocation(seed);
        lowestLocation = Math.min(lowestLocation, location);
      }
    } else {
      lowestLocation = 0;
      let maxLocation = this.getMaxLocation();
      for (let batchSize = 10000; batchSize >= 1; batchSize /= 10) {
        for (let i = Math.max(0, lowestLocation - batchSize * 10); i < maxLocation; i += batchSize) {
          lowestLocation = i;
          const seed = this.locationToSeed(i);
          if (this.isValidSeed(seed)) {
            maxLocation = lowestLocation;
            break;
          }
        }
      }
    }
    return lowestLocation;
  };

  private parseMap = (descriptor: string, sections: Array<string>): Array<AlmanacMap> => {
    const map: Array<AlmanacMap> = [];
    const section = sections
      .find((sec) => sec.startsWith(descriptor))
      ?.split('\n')
      .slice(1);
    if (!section) return map;

    section.forEach((line) => {
      const entries = line.split(' ');
      map.push({
        destinationStart: +entries[0],
        sourceStart: +entries[1],
        range: +entries[2],
      });
    });
    return map;
  };

  private seedToLocation = (seed: number): number => {
    const soil = this.mapFn(this.almanac.seedToSoil, seed) ?? seed;
    const fertilizer = this.mapFn(this.almanac.soilToFertilizer, soil) ?? soil;
    const water = this.mapFn(this.almanac.fertilizerToWater, fertilizer) ?? fertilizer;
    const light = this.mapFn(this.almanac.waterToLight, water) ?? water;
    const temperature = this.mapFn(this.almanac.lightToTemperature, light) ?? light;
    const humidity = this.mapFn(this.almanac.temperatureToHumidity, temperature) ?? temperature;
    return this.mapFn(this.almanac.humidityToLocation, humidity) ?? humidity;
  };

  private locationToSeed = (location: number): number => {
    const humidity = this.mapFn(this.reverseMap(this.almanac.humidityToLocation), location) ?? location;
    const temperature = this.mapFn(this.reverseMap(this.almanac.temperatureToHumidity), humidity) ?? humidity;
    const light = this.mapFn(this.reverseMap(this.almanac.lightToTemperature), temperature) ?? temperature;
    const water = this.mapFn(this.reverseMap(this.almanac.waterToLight), light) ?? light;
    const fertilizer = this.mapFn(this.reverseMap(this.almanac.fertilizerToWater), water) ?? water;
    const soil = this.mapFn(this.reverseMap(this.almanac.soilToFertilizer), fertilizer) ?? fertilizer;
    return this.mapFn(this.reverseMap(this.almanac.seedToSoil), soil) ?? soil;
  };

  private mapFn = (maps: Array<AlmanacMap>, source: number): number | undefined => {
    let destination: number | undefined = undefined;
    maps.forEach((map) => {
      if (map.sourceStart > source || map.sourceStart + map.range < source) return;
      destination = map.destinationStart + (source - map.sourceStart);
    });
    return destination;
  };

  private reverseMap = (maps: Array<AlmanacMap>): Array<AlmanacMap> => {
    return maps.map((m) => ({ sourceStart: m.destinationStart, destinationStart: m.sourceStart, range: m.range }));
  };

  private getSeedRanges = (seedInput: string): Array<SeedRange> => {
    const seedRanges: Array<SeedRange> = [];
    const parsedSeedInput: Array<number> = seedInput
      .split(' ')
      .slice(1)
      .map((str) => +str);
    for (let i = 0; i < parsedSeedInput.length - 1; i += 2) {
      seedRanges.push({ start: parsedSeedInput[i], range: parsedSeedInput[i + 1] });
    }
    return seedRanges;
  };

  private isValidSeed = (seed: number): boolean => {
    return this.almanac.seedsExtra.some((seeds) => seeds.start <= seed && seeds.start + seeds.range >= seed);
  };

  private getMaxLocation = (): number => {
    const greatestLocationMap = this.almanac.humidityToLocation.sort((a, b) => b.sourceStart - a.sourceStart)[0];
    return greatestLocationMap.sourceStart + greatestLocationMap.range;
  };
}
