import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreateActionComponent } from './survey-create-action.component';

describe('SurveyCreateActionComponent', () => {
  let component: SurveyCreateActionComponent;
  let fixture: ComponentFixture<SurveyCreateActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCreateActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCreateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
