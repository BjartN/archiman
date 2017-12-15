import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepBuilderComponent } from './dep-builder.component';

describe('DepBuilderComponent', () => {
  let component: DepBuilderComponent;
  let fixture: ComponentFixture<DepBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
