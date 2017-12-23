
import * as Collections from 'typescript-collections';

export type Predicate<T> = (n: T) => boolean;

export class SparseDirectedGraph<TNode extends INode, TEdge>  {
    private adjacencyList = new Collections.Dictionary<number, Array<Relation<TNode, TEdge>>>();
    private adjacencyListInverse = new Collections.Dictionary<number, Array<Relation<TNode, TEdge>>>();
    private nodes = new Collections.Dictionary<number, TNode>();
    private relations = new Array<Relation<TNode, TEdge>>();

    private edgesCount: 0;
    private firstInsertedNode: TNode;

    constructor() { }

    addVertex(node: TNode): boolean {
        if (this.hasVertex(node)) {
            return false;
        }

        if (this.adjacencyList.size() === 0) {
            this.firstInsertedNode = node;
        }

        this.adjacencyList.setValue(node.id, new Array<Relation<TNode, TEdge>>());
        this.adjacencyListInverse.setValue(node.id, new Array<Relation<TNode, TEdge>>());
        this.nodes.setValue(node.id, node);

        return true;
    }

    neighbours(vertex: TNode, predicate: Predicate<Relation<TNode, TEdge>> = (x) => true): TNode[] {
        if (!this.hasVertex(vertex)) {
            return null;
        }

        return this
            .adjacencyList
            .getValue(vertex.id)
            .filter(predicate)
            .map(x => x.to);
    }

    neighboursOf(vertex: TNode, predicate: Predicate<Relation<TNode, TEdge>> = (x) => true): Relation<TNode, TEdge>[] {
        if (!this.hasVertex(vertex)) {
            return null;
        }

        return this.adjacencyListInverse
            .getValue(vertex.id)
            .filter(predicate)
            .map(x => x);

    }

    findRelation(predicate: Predicate<Relation<TNode, TEdge>>): Relation<TNode, TEdge>[] {
        const a = [];
        this.adjacencyList.forEach((key, value) => {
            const r = value.forEach(x => {
                if (predicate(x)) {
                    a.push(x);
                }
            });
        });
        return a;
    }

    /**
     * Create a tree of nodes based on the relation. If cycles occur, break them.
     * Root nodes are all nodes which does not have the incoming relation.
     * **/
    buildTree( predicate: Predicate<Relation<TNode, TEdge>> ): Tree<TNode> {
        const nodeMap = {};

        const roots = this.adjacencyListInverse
            .keys()
            .filter( key => this.adjacencyListInverse.getValue(key).some(predicate) === false)
            .map( key => new Tree(this.nodes.getValue(key)));


        const root = new Tree(null, roots);
        root.children.forEach( x => this.addChildren(predicate, x, nodeMap));

        return root;
    }

    private addChildren( predicate: Predicate<Relation<TNode, TEdge>>, node: Tree<TNode>, nodeMap: any) {
        nodeMap[node.node.id] = true;
        const children = this.neighbours(node.node, predicate);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!nodeMap[children[i]]) {
                this.addChildren( predicate, new Tree(child), nodeMap);
            }
        }
    }

    find(f: Predicate<TNode>): TNode[] {
        const result = [];
        this.nodes.forEach((key, value) => {
            if (f(value)) {
                result.push(value);
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

        const edge = new Relation(source, target, edgeData);
        this.adjacencyList.getValue(source.id).push(edge);
        this.adjacencyListInverse.getValue(target.id).push(edge);
        this.relations.push(edge);
        this.edgesCount++;

        return true;
    }

    findOrDefault(f: Predicate<TNode>): TNode {
        const a = this.find(f);

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

export class Tree<T> {

    constructor(public node: T, public children = new Array<Tree<T>>()) {

    }
}

export class TreeNode {
    constructor(public id: number, public type: string, public name: string, public edgeTo: number[]) {

    }
}
