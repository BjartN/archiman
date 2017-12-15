import { Injectable } from '@angular/core';
import { Block } from './block';
import { DEPS } from './mock-flare';

@Injectable()
export class GraphService {

  deps: any[];

  constructor() {
    this.deps = DEPS.map(x => x);
  }

  addLink(from: number, to: number) {
    var map = {};
    this.deps.forEach(x => map[x.id] = x);
    var f = map[from];

    if (f.edgeTo.indexOf(to) >= 0)
      return;

    f.edgeTo.push(to);
  }

  getTree(): Block[] {
    return this.deps;
  }

  getDeps(): any[] {
    return this.deps;
  }
}
