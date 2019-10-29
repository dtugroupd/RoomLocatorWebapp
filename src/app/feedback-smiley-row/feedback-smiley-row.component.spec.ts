import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSmileyRowComponent } from './feedback-smiley-row.component';

describe('FeedbackSmileyRowComponent', () => {
  let component: FeedbackSmileyRowComponent;
  let fixture: ComponentFixture<FeedbackSmileyRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSmileyRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSmileyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
