import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionGridComponent } from './intervention-grid.component';

describe('InterventionGridComponent', () => {
  let component: InterventionGridComponent;
  let fixture: ComponentFixture<InterventionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
