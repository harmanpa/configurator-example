import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTreeComponent } from './part-tree.component';

describe('PartTreeComponent', () => {
  let component: PartTreeComponent;
  let fixture: ComponentFixture<PartTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
