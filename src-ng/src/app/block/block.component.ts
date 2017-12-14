import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../block'

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() block: Block = {
    id: 1,
    name: 'Windstorm'
  };

  @Output() droppedBlock: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDropped(e: any) {
    var dropped = <number>e.dragData;
    this.droppedBlock.emit(dropped);
  }
}
