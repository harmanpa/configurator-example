import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAssemblyTreeComponent } from './sub-assembly-tree.component';

describe('SubAssemblyTreeComponent', () => {
  let component: SubAssemblyTreeComponent;
  let fixture: ComponentFixture<SubAssemblyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAssemblyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAssemblyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
