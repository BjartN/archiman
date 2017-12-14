import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { noUndefined } from '@angular/compiler/src/util';
import { ViewEncapsulation } from '@angular/core';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-dep-graph',
  templateUrl: './dep-graph.component.html',
  styleUrls: ['./dep-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepGraphComponent implements OnInit {

  deps: any[];
  constructor(gs: GraphService) {
    this.deps = gs.getDeps();
  }

  ngOnInit() {

    var diameter = 800,
      radius = diameter / 2,
      innerRadius = radius - 120;

    var cluster = d3.cluster()
      .size([360, innerRadius]);

    var line = d3.radialLine()
      .curve(d3.curveBundle.beta(0.85))
      .radius(function (d) { return d.y; })
      .angle(function (d) { return d.x / 180 * Math.PI; });

    var svg = d3.select("#dep-graph").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    var link = svg.append("g").selectAll(".link"),
      node = svg.append("g").selectAll(".node");

    this.onDataRecieved(this.deps, cluster, link, line, node)
  }

  makeHierarchy(data) {

    var nodeIdx = {}, childIdx = {};
    data.forEach(x => nodeIdx[x.id] = x);

    //add children to all nodes
    data.forEach(x => {
      x.children = x.edgeTo.map(id => nodeIdx[id]);
      x.edgeTo.forEach(y => { childIdx[y] = true });
    });

    var children = data
      .reduce((acc, b) => { return acc.concat(b.children) }, [])
      .map(x => x.id);

    var notAChild = data.filter(x => childIdx[x.id] === undefined);

    var h = d3.hierarchy({
      id: -1,
      children: notAChild,
      size: 1000,
    });

    return h;
  }

  onDataRecieved(data, cluster, link, line, node) {

    var root = this
      .packageHierarchy(data)
      .sum(function (d) { return d.size; });

    cluster(root);

    link = link
      .data(this.packageImports(root.leaves()))
      .enter().append("path")
      .each(function (d) { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr("d", line);

    node = node
      .data(root.leaves())
      .enter().append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      .attr("text-anchor", function (d) { return d.x < 180 ? "start" : "end"; })
      .text(function (d) { return d.data.key; });
  }

  find(name, data, map) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || { name: name, children: [] };
      if (name.length) {
        node.parent = this.find(name.substring(0, i = name.lastIndexOf(".")), undefined, map);
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  packageHierarchy(classes) {
    var map = {};

    classes.forEach(d => {
      this.find(d.name, d, map);
    });

    return d3.hierarchy(map[""]);
  }

  packageImports(nodes) {
    var map = {},
      imports = [];

    // Compute a map from name to node.
    nodes.forEach(d => {
      map[d.data.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach((d) => {
      if (d.data.imports) {
        d.data.imports.forEach(i => {
          imports.push(map[d.data.name].path(map[i]));
        });
      }
    });

    return imports;
  }

}
