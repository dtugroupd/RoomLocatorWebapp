import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyFeedbackSmileyRowComponent } from './survey-feedback-smiley-row.component';



describe('FeedbackSmileyRowComponent', () => {
  let component: SurveyFeedbackSmileyRowComponent;
  let fixture: ComponentFixture<SurveyFeedbackSmileyRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyFeedbackSmileyRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFeedbackSmileyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
