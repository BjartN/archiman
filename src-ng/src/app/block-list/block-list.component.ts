import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';
import { Block } from '../block';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {

  blocks: Block[];
  gs: GraphService;

  constructor(gs: GraphService) {
    this.gs = gs;
    this.blocks = gs.getTree();
  }

  ngOnInit() { }

  droppedBlockHandler(target: number, source: any) {
    this.gs.addLink(source, target);
  }


}
