using System.Linq;
using System.Collections.Generic;

namespace Archiman
{
    public class WorkspaceCollection<TEdgeData, TNodeData>
    {
        public Workspace<TEdgeData, TNodeData>[] Workspaces
        {
            get; set;
        }
    }

    public class Workspace<TEdgeData, TNodeData>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Graph<TEdgeData, TNodeData> Graph { get; set; }
    }

    public class Graph<TEdgeData, TNodeData>
    {
        public Graph()
        {
            Nodes = new List<Node<TNodeData>>();
            Edges = new List<Edge<TEdgeData>>();
        }
        public List<Node<TNodeData>> Nodes { get; set; }
        public List<Edge<TEdgeData>> Edges { get; set; }

        public void AddEdges(Node<TNodeData> from, TEdgeData data, params Node<TNodeData>[] tos)
        {
            foreach (var to in tos)
            {
                Edges.Add(new Edge<TEdgeData>(from.Id, to.Id, data));
            }
        }

        public Node<TNodeData> CreateNode(int id, TNodeData d)
        {
            var n = new Node<TNodeData>(id, d);
            Nodes.Add(n);
            return n;
        }
    }

    public class Node<NodeData>
    {
        public Node(int id, NodeData d)
        {
            Id = id;
        }

        public int Id { get; set; }
        public NodeData Data { get; set; }
    }

    public class NodeData
    {
        public NodeData(string type, string name)
        {
            Type = type;
            Name = name;
        }
        public string Type { get; set; }
        public string Name { get; set; }
    }


    public class Edge<TData>
    {
        public Edge(int from, int to, TData d)
        {
            From = from;
            To = to;
            Data = d;
        }

        public TData Data { get; set; }
        public int From { get; private set; }
        public int To { get; private set; }
    }

    public class EdgeData
    {
        public EdgeData(string type)
        {
            Type = type;
        }
        public string Type { get; set; }
    }
}