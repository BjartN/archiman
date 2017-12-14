import { Injectable } from '@angular/core';
import { Block } from './block';
import { BLOCKS } from './mock-blocks';

@Injectable()
export class GraphService {

  constructor() { 

  }

  getTree() : Block[]{
    return BLOCKS;
  }
}
