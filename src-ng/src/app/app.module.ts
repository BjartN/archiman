import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BlockListComponent } from './block-list/block-list.component';
import { BlockComponent } from './block/block.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { GraphService } from './graph.service';
import { DepGraphComponent } from './dep-graph/dep-graph.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BlockListComponent,
    BlockComponent,
    DepGraphComponent
  ],
  imports: [
    BrowserModule,
    NgDragDropModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: BlockListComponent },
      { path: 'dep', component: DepGraphComponent }
      //{ path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
