import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BlockListComponent } from './block-list/block-list.component';
import { BlockComponent } from './block/block.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { GraphService} from './graph.service';

@NgModule({
  declarations: [
    AppComponent,
    BlockListComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule, 
    NgDragDropModule.forRoot()
  ],
  providers: [
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
