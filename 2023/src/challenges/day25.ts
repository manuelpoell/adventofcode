import { Challenge } from './challenge';

// https://www.geeksforgeeks.org/introduction-and-implementation-of-kargers-algorithm-for-minimum-cut/

class Edge<T = any> {
  src: T;
  dest: T;
  constructor(s: T, d: T) {
    this.src = s;
    this.dest = d;
  }
}

class Graph<T = any> {
  V: T;
  E: T;
  edge: Array<Edge<T>>;
  constructor(v: T, e: T) {
    this.V = v;
    this.E = e;
    this.edge = [];
  }
}

class SubSet<T = any> {
  parent: T;
  rank: number;
  constructor(p: T, r: number) {
    this.parent = p;
    this.rank = r;
  }
}

export class Day25 extends Challenge {
  partTwo: boolean;
  nodes: Array<string> = [];
  edges: Array<[number, number]> = [];
  indexes: { [key: string]: number } = {};

  constructor(input: string, partTwo: boolean) {
    super();
    this.partTwo = partTwo;
    this.parseGraph(input);
  }

  solve = (): number => {
    const V = this.nodes.length;
    const E = this.edges.length;

    let g = new Graph<number>(V, E);
    g.edge = this.edges.map(([u, v]) => new Edge<number>(u, v));

    let res;
    let components;
    while (res !== 3) {
      [res, components] = this.kargerMinCut(g);
    }

    let list: { [key: string]: number } = {};
    components?.forEach((c) => {
      if (!(c in list)) {
        list[c] = 0;
      }
      list[c]++;
    });

    return Object.values(list).reduce((p, v) => p * v, 1);
  };

  private parseGraph = (input: string): void => {
    input
      .trim()
      .split('\n')
      .forEach((line) => {
        const [left, right] = line.split(': ');
        const u = this.add(left);

        right
          .trim()
          .split(' ')
          .forEach((c) => {
            const v = this.add(c);
            this.edges.push([u, v]);
          });
      });
  };

  private add = (u: string): number => {
    if (!(u in this.indexes)) {
      this.indexes[u] = this.nodes.length;
      this.nodes.push(u);
    }
    return this.indexes[u];
  };

  private kargerMinCut = (graph: Graph): [number, Array<number>] => {
    const { V, E, edge } = graph;
    const subsets: Array<SubSet> = [];

    for (let v = 0; v < V; v++) {
      subsets[v] = new SubSet(v, 0);
    }

    let vertices = V;
    while (vertices > 2) {
      const i = Math.floor(Math.random() * (E - 1));
      const subset1 = this.find(subsets, edge[i].src);
      const subset2 = this.find(subsets, edge[i].dest);

      if (subset1 === subset2) continue;

      vertices--;
      this.union(subsets, subset1, subset2);
    }

    let cutedges = 0;
    for (let i = 0; i < E; i++) {
      const subset1 = this.find(subsets, edge[i].src);
      const subset2 = this.find(subsets, edge[i].dest);
      if (subset1 !== subset2) {
        cutedges++;
      }
    }

    const components = new Array<number>(V).fill(0).map((_, i) => this.find(subsets, i));
    return [cutedges, components];
  };

  private find = (subsets: Array<SubSet>, i: number): number => {
    if (subsets[i].parent !== i) {
      subsets[i].parent = this.find(subsets, subsets[i].parent);
    }

    return subsets[i].parent;
  };

  private union = (subsets: Array<SubSet>, x: number, y: number): void => {
    const xroot = this.find(subsets, x);
    const yroot = this.find(subsets, y);

    if (subsets[xroot].rank < subsets[yroot].rank) {
      subsets[xroot].parent = yroot;
    } else if (subsets[xroot].rank > subsets[yroot].rank) {
      subsets[yroot].parent = xroot;
    } else {
      subsets[yroot].parent = xroot;
      subsets[xroot].rank++;
    }
  };
}
