import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGroupsComponent } from './assign-groups.component';

describe('AssignGroupsComponent', () => {
  let component: AssignGroupsComponent;
  let fixture: ComponentFixture<AssignGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
