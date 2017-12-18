import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { noUndefined } from '@angular/compiler/src/util';
import { ViewEncapsulation } from '@angular/core';
import { GraphService } from '../graph.service';
import { leave } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-dep-graph',
  templateUrl: './dep-graph.component.html',
  styleUrls: ['./dep-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepGraphComponent implements OnInit {

  deps: any[];
  gs: GraphService;

  constructor(gs: GraphService) {
    this.gs = gs;
  }

  ngOnInit() {
    this.deps = this.gs.getDeps();

    var diameter = 900,
      radius = diameter / 2,
      innerRadius = radius - 120;

    var cluster = d3.cluster()
      .size([360, innerRadius]);

    var svg = d3.select("#dep-graph").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    var line = d3.radialLine()
      .curve(d3.curveBundle.beta(0.85))
      .radius(d => { return (<any>d).y; })
      .angle(d => { return (<any>d).x / 180 * Math.PI; });
    var link = svg.append("g").selectAll(".link");
    var node = svg.append("g").selectAll(".node");

    var root = this
      .makeHierarchy(this.deps)
      .sum(d => { return 0; });

    cluster(root);


    link = link
      .data(this.makeLink(root))
      .enter().append("path")
      .each(d => { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr("d", line);

    node = node
      .data(root.leaves())
      .enter().append("text")
      .attr("class", "node")
      .attr("class", d => (<any>d).data.type)
      .attr("dy", "0.31em")
      .attr("transform", d => { return "rotate(" + ((<any>d).x - 90) + ")translate(" + ((<any>d).y + 8) + ",0)" + ((<any>d).x < 180 ? "" : "rotate(180)"); })
      .attr("text-anchor", d => { return (<any>d).x < 180 ? "start" : "end"; })
      .text(d => { return (<any>d).data.name; });

  }

  /** Make a 3 deep three where leaf nodes are the blocks, and middle nodes are the types of each block  **/
  makeHierarchy(data) {
    var groups = this.groupBy(data, x => x.type)
    var i = -10;

    var nodes = [];

    for (var key in groups) {
      if (groups.hasOwnProperty(key)) {
        nodes.push({
          id: i++,
          children: groups[key]
        })
      }
    }

    var h = d3.hierarchy({
      id: -1,
      children: nodes
    });

    return h;
  }

  makeLink(root) {
    var all = root.leaves();
    var map = {};
    all.forEach(x => { map[x.data.id] = x });

    var r = [];

    all.forEach(x => {
      x.data.edgeTo.forEach(id => {
        r.push(x.path(map[id]));
      })
    });

    return r;
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[key(x)] = rv[key(x)] || []).push(x);
      return rv;
    }, {});
  }
}
