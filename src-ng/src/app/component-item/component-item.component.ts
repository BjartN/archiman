import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tree } from '../graph';
import { Node, Edge } from '../graph.service';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.css']
})
export class ComponentItemComponent implements OnInit {

  @Input() node: Node;

  @Output() droppedBlock: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDropped(e: any) {
    const dropped = <number>e.dragData;
    this.droppedBlock.emit(dropped);
  }
}
