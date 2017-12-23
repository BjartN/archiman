import { Component, OnInit } from '@angular/core';
import { GraphService} from '../graph.service';
import { Tree, Node, Edge } from '../model';

@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent implements OnInit {

  treeNode: Tree<Node>;
  gs: GraphService;

  constructor(gs: GraphService) {
    this.gs = gs;
    this.treeNode = gs.getNestedBlocks();
  }

  ngOnInit() {

  }

  droppedBlockHandler(target: number, source: any) {
    this.gs.addLink(source, target);
  }


}
