using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Archiman.Models;

namespace Archiman.Controllers
{
    public class RootController : Controller
    {
        public IActionResult ReadMe()
        {
            return View();
        }

        public IActionResult Index()
        {
            var graph = new Graph<EdgeData, NodeData>();

            var a = graph.CreateNode(1, new NodeData("MetOcean Services", "block"));
            var b = graph.CreateNode(2, new NodeData("Map", "block"));
            var c = graph.CreateNode(3, new NodeData("Table", "block"));
            var d = graph.CreateNode(4, new NodeData("Graph", "block"));
            var e = graph.CreateNode(5, new NodeData("MetOcean.Core", "library"));
            var f = graph.CreateNode(6, new NodeData("StormGeo.Data", "library"));
            var g = graph.CreateNode(7, new NodeData("Metocean-Casino", "database"));

            var server = graph.CreateNode(8, new NodeData("casino.storm.no", "server"));

            graph.AddEdges(a, new EdgeData("contains"), b, c, d);         //higher level logical block A "contains" lower level logical block B
            graph.AddEdges(f, new EdgeData("uses"), g);                   //logical block A "uses" logical block B
            graph.AddEdges(g, new EdgeData("runsOn"), server);            //logical block A "runsOn" device block B (which kinda makes A no longer a logical block in this context)

            return Json(new WorkspaceCollection<EdgeData, NodeData>
            {
                Workspaces = new[]{
                    new Workspace<EdgeData,NodeData> {
                        Id=1,
                        Name = "Workspace #1",
                        Graph = graph
                    }
                }
            });
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
