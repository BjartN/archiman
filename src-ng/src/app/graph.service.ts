import { Injectable } from '@angular/core';
import { Block } from './block';
import { DEPS } from './mock-flare';

@Injectable()
export class GraphService {

  constructor() {

  }

  addLink(from: number, to: number) {
    var f = DEPS.find(x => x.id == from);
    var t = DEPS.find(x => x.id == to);
  }

  getTree(): Block[] {
    return DEPS;
  }

  getDeps(): any[] {
    return DEPS;
  }
}
