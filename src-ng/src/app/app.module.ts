import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentTreeComponent } from './component-tree/component-tree.component';
import { ComponentItemComponent } from './component-item/component-item.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { GraphService } from './graph.service';
import { DepGraphComponent } from './dep-graph/dep-graph.component';
import { RouterModule } from '@angular/router';
import { DepBuilderComponent } from './dep-builder/dep-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentTreeComponent,
    ComponentItemComponent,
    DepGraphComponent,
    DepBuilderComponent
  ],
  imports: [
    BrowserModule,
    NgDragDropModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: DepBuilderComponent },
      { path: 'dep', component: DepGraphComponent }
      // { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
