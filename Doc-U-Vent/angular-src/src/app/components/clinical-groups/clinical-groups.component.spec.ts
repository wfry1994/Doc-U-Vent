import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalGroupsComponent } from './clinical-groups.component';

describe('ClinicalGroupsComponent', () => {
  let component: ClinicalGroupsComponent;
  let fixture: ComponentFixture<ClinicalGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
