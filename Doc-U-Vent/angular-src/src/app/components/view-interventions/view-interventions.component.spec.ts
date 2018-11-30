import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterventionsComponent } from './view-interventions.component';

describe('ViewInterventionsComponent', () => {
  let component: ViewInterventionsComponent;
  let fixture: ComponentFixture<ViewInterventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
