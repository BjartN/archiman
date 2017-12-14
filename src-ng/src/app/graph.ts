export class Graph<TEdgeData,TNodeData> {
    nodes : Node<TNodeData>[];
    edges: Edge<TEdgeData>[];

    
}

class NodeData{
    type:string;
}

class EdgeData{
    type: string;
}

class Node<TNodeData>{
    id: number;
    data : TNodeData;
}

class Edge<TEdgeData> {
    id: number;
    data : TEdgeData;
}