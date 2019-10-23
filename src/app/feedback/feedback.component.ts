import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
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

  constructor(protected dialogRef: NbDialogRef<any>, private service: SurveyService, private toastrService: NbToastrService ) { }

  ngOnInit() {
    const qAnswers: QuestionAnswerSubmition[] = [];
    this.survey.questions.forEach(q => {
      const qa = { questionId: q.id, text: q.text, score: -1};
      qAnswers.push(qa);
    });

    this.answer = { surveyId: this.survey.id, questionAnswers: qAnswers };
  }

  close() {
    this.dialogRef.close({submit: false});
  }

  submit() {
    const empty = this.answer.questionAnswers.find(x => {
      return x.score === -1;
    });

    if (empty) {
      this.showWarningToast('top-right', 'warning');
      return;
    }

    this.service.postSurveyAnswer(this.answer).subscribe(res => {
      if (res === null) {
        this.dialogRef.close({submit: true});
      } else {
        this.dialogRef.close({submit: false, error: true});
      }
    });
  }

  showWarningToast(position, status) {
    this.toastrService.show(
      status || 'Warning',
      `Please answer all questions before submitting.`,
      { position, status });
  }
}
