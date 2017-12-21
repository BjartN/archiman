import { SparseDirectedGraph } from './graph';

class Entry {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public usesEdgeTo: number[],
        public containsEdgeTo: number[]) {

    }
}

const DEPS =
    [
        new Entry(1, 'Graphs', 'service', [40], []),
        new Entry(2, 'Table', 'service', [40], []),
        new Entry(3, 'ADCP', 'service', [40], []),
        new Entry(4, 'Admin FPS', 'service', [40], []),
        new Entry(5, 'Admin MVC', 'service', [40], []),
        new Entry(6, 'Asset Overview', 'service', [40], []),
        new Entry(7, 'CMS Admin', 'service', [40], []),
        new Entry(8, 'Warning', 'service', [40], []),
        new Entry(9, 'WebClient', 'service', [40], []),
        new Entry(10, 'SubDel', 'service', [40], []),
        new Entry(11, 'WebApi', 'service', [800], [40]),
        new Entry(12, 'Tables And Graphs', 'service', [40], []),
        new Entry(13, 'Tropical', 'service', [40], []),
        new Entry(14, 'Tides', 'service', [40], []),

        new Entry(40, 'MetOcean.Core', 'lib', [50], []),
        new Entry(50, 'Wod', 'lib', [600, 700, 800], []),

        new Entry(600, 'D2 Lx', 'db', [], []),
        new Entry(700, 'CorrectedDb Lx', 'db', [], []),
        new Entry(800, 'Observation Lx', 'db', [], [])
    ];


export function getGraph(): SparseDirectedGraph<Node, Edge> {

    const g = new SparseDirectedGraph<Node, Edge>();
    const map = {};

    DEPS.forEach(x => {
        map[x.id] = new Node(x.id, x.name, x.type);
        g.addVertex(map[x.id]);
    });

    DEPS.forEach(x => {
        x.usesEdgeTo.forEach(y => {
            g.addEdge(map[x.id], map[y], new Edge('uses'));
        });

        x.containsEdgeTo.forEach(y => {
            g.addEdge(map[x.id], map[y], new Edge('contains'));
        });
    });

    return g;
}

export class Node {
    constructor(public id: number, public name: string, public type: string) {

    }
}

export class Edge {
    constructor(public type: string) {

    }
}

export class TreeNode {
    constructor(public id: number, public type: string, public name: string, public edgeTo: number[]) {

    }
}
