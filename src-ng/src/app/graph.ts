
import * as Collections from 'typescript-collections';

export type Predicate<T> = (n: T) => boolean;

export class SparseDirectedGraph<TNode extends INode, TEdge>  {
    adjacencyList = new Collections.Dictionary<number, Collections.LinkedList<Relation<TNode, TEdge>>>();
    adjacencyListInverse = new Collections.Dictionary<number, Collections.LinkedList<Relation<TNode, TEdge>>>();
    nodes = new Collections.Dictionary<number, TNode>();

    edgesCount: 0;
    firstInsertedNode: TNode;

    constructor() { }

    addVertex(node: TNode): boolean {
        if (this.hasVertex(node)) {
            return false;
        }

        if (this.adjacencyList.size() === 0) {
            this.firstInsertedNode = node;
        }

        this.adjacencyList.setValue(node.id, new Collections.LinkedList<Relation<TNode, TEdge>>());
        this.adjacencyListInverse.setValue(node.id, new Collections.LinkedList<Relation<TNode, TEdge>>());
        this.nodes.setValue(node.id, node);

        return true;
    }

    neighbours(vertex: TNode): TNode[] {
        if (!this.hasVertex(vertex)) {
            return null;
        }

        return this.adjacencyList.getValue(vertex.id).toArray().map(x => x.to);
    }

    neighboursOf(vertex: TNode): Relation<TNode, TEdge>[] {
        if (!this.hasVertex(vertex)) {
            return null;
        }

        return this.adjacencyListInverse.getValue(vertex.id).toArray().map(x => x);
    }

    findRelation(f: Predicate<Relation<TNode, TEdge>>): Relation<TNode, TEdge>[] {
        var a = [];
        this.adjacencyList.forEach((key, value) => {
            var r = value.toArray().forEach(x => {
                if (f(x)) {
                    a.push(x);
                }
            });
        })
        return a;
    }

    find(f: Predicate<TNode>): TNode[] {
        var result = [];
        this.nodes.forEach((key, value) => {
            if (f(value)) {
                result.push(value)
            }
        });
        return result;
    }

    hasVertex(v: TNode): boolean {
        return this.adjacencyList.containsKey(v.id);
    }

    hasEdge(source: TNode, target: TNode): boolean {
        return (this.adjacencyList.containsKey(source.id)
            && this.adjacencyList.containsKey(target.id)
            && this.doesEdgeExist(source, target));
    }

    addEdge(source: TNode, target: TNode, edgeData: TEdge): boolean {
        if (!this.hasVertex(source) || !this.hasVertex(target)) {
            return false;
        }

        if (this.hasEdge(source, target)) {
            return false;
        }

        var edge = new Relation(source, target, edgeData);
        this.adjacencyList.getValue(source.id).add(edge);
        this.adjacencyListInverse.getValue(target.id).add(edge)

        this.edgesCount++;

        return true;
    }

    findOrDefault(f: Predicate<TNode>): TNode {
        var a = this.find(f);

        if (a.length > 0) {
            return a[0];
        }

        return null;
    }

    private doesEdgeExist(v1: TNode, v2: TNode): boolean {
        return this.neighbours(v1).indexOf(v2) >= 0;
    }
}

interface INode {
    id: number;
}

class Relation<TNode, TEdge> {
    constructor(public from: TNode, public to: TNode, public edge: TEdge) {

    }
}
