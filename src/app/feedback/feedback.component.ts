import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Survey, SurveyAnswerSubmition, QuestionAnswerSubmition } from '../models/mazemap.model';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  survey: Survey;
  answer: SurveyAnswerSubmition;
  didSubmit: boolean;
  constructor(protected dialogRef: NbDialogRef<any>, private service: SurveyService) { }

  ngOnInit() {
    const qAnswers: QuestionAnswerSubmition[] = [];
    this.survey.questions.forEach(q => {
      const qa = { questionId: q.id, text: q.text, score: -1};
      qAnswers.push(qa);
    });

    this.answer = { surveyId: this.survey.id, questionAnswers: qAnswers };
  }

  close() {
    this.didSubmit = false;
    this.dialogRef.close(this.didSubmit);
  }

  submit() {
    const res = this.service.postAnswer(this.answer);
    console.log("Response: ");
    console.log(res);
    this.didSubmit = true;
    console.log(this.answer);
    this.dialogRef.close(this.didSubmit);
  }

}
