
import * as Collections from 'typescript-collections';

export class SparseDirectedGraph<TNode extends INode, TEdgeData>  {
    adjacencyList: Collections.Dictionary<number, Collections.LinkedList<DataEdge<TNode,TEdgeData>>>;
    edgesCount: number = 0;
    firstInsertedNode: TNode;

    constructor() { }

    addVertex(node:TNode):boolean
    {
        if (this.hasVertex(node))
            return false;

        if (this.adjacencyList.size() == 0)
            this.firstInsertedNode = node;

        this.adjacencyList[node.id]= new Collections.LinkedList<DataEdge<TNode,TEdgeData>>();
        
        return true;
    }

    neighbours(vertex:TNode) : TNode[]
    {
        if (!this.hasVertex(vertex))
            return null;

        return this.adjacencyList[vertex.id].map(x=>x.node);
    }

    hasVertex(v: TNode):boolean {
        return this.adjacencyList.containsKey(v.id);
    }

    doesEdgeExist(v1: TNode, v2: TNode) :boolean {
        return this.adjacencyList[v1.id].indexOf(x=>x.target.id==v2.id);
    }


    hasEdge(source: TNode, target: TNode): boolean {
        return (this.adjacencyList.containsKey(source.id)
            && this.adjacencyList.containsKey(target.id)
            && this.doesEdgeExist(source, target));
    }

    addEdge(source: TNode, target: TNode, edgeData: TEdgeData):boolean {
        if (!this.hasVertex(source) || !this.hasVertex(target)) {
            return false;
        }

        if (this.hasEdge(source, target)) {
            return false
        }

        this.adjacencyList[source.id].add(new DataEdge(target,edgeData));
        this.edgesCount++;

        return true;
    }

}


interface INode {
 id: number;
}

class DataEdge<TNode,TEdgeData> {
    constructor(public node:TNode, public edgeData: TEdgeData){}
}
