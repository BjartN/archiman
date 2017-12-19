import { Injectable } from '@angular/core';
import { Block } from './block';
import { DEPS, getGraph, Node, Edge, TreeNode } from './mock-flare';
import { SparseDirectedGraph } from './graph';

@Injectable()
export class GraphService {

  graph: SparseDirectedGraph<Node, Edge>;

  constructor() {
    this.graph = getGraph();
  }

  addLink(from: number, to: number) {
    this.graph.addEdge(
      this.graph.findOrDefault(x => x.id == from),
      this.graph.findOrDefault(x => x.id == to),
      new Edge("uses"));
  }

  /** Get tree of "uses" relation. **/
  getTree(): Block[] {
    return this.graph.find(x => true).map(x => new Block(x.id, x.name));
  }

  getDeps(): TreeNode[] {
    var result = this.graph
      .find(x => true)
      .map(x => new TreeNode(x.id, x.type, x.name, this.graph.neighbours(x).map(x => x.id)));

    return result;
  }
}
