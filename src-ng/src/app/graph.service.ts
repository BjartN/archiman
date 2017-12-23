import { Injectable } from '@angular/core';
import {Edge, TreeNode, SparseDirectedGraph, Tree, Node } from './model';
import { getGraph } from './mock-flare';

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

  /**
   * Get the tree of blocks formed by the "contains" dependency
   */
  getNestedBlocks(): Tree<Node> {
    return this.graph
      .buildTree( x => x.edge.type === 'contains');
  }

  getDependencies(): TreeNode[] {
    const result = this.graph
      .find(x => true)
      .map(x => new TreeNode(x.id, x.type, x.name, this.graph.neighbours(x).map(y => y.id)));

    return result;
  }
}
