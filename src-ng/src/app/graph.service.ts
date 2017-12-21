import { Injectable } from '@angular/core';
import { Block } from './block';
import { Node, Edge, TreeNode, getGraph } from './mock-flare';
import { SparseDirectedGraph } from './graph';

@Injectable()
export class GraphService {

  graph: SparseDirectedGraph<Node, Edge>;

  constructor() {
    this.graph = getGraph();

  }

  addLink(from: number, to: number) {
    this.graph.addEdge(
      this.graph.findOrDefault(x => x.id === from),
      this.graph.findOrDefault(x => x.id === to),
      new Edge('uses'));
  }

  getNestedBlocks(): Block[] {
    return this
      .graph.find(x => true)
      .map(x => new Block(x.id, x.name));
  }

  getDependencies(): TreeNode[] {
    const result = this.graph
      .find(x => true)
      .map(x => new TreeNode(x.id, x.type, x.name, this.graph.neighbours(x).map(y => y.id)));

    return result;
  }
}
