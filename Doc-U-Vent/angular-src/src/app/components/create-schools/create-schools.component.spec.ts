import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolsComponent } from './create-schools.component';

describe('CreateSchoolsComponent', () => {
  let component: CreateSchoolsComponent;
  let fixture: ComponentFixture<CreateSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
