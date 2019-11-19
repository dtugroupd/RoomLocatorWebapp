/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { SurveyAnswerSubmition } from 'src/app/models/survey/survey-answer-submition.model';
import { Survey } from 'src/app/models/survey/survey.model';
import { QuestionAnswerSubmition } from 'src/app/models/question/question-answer-submition.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SurveyService } from '../../_services/survey.service';
import { Store } from '@ngxs/store';
import { AddSurveyAnswer } from 'src/app/_actions/mazemap.actions';

@Component({
  selector: 'app-survey-feedback',
  templateUrl: './survey-feedback.component.html',
  styleUrls: ['./survey-feedback.component.scss']
})

export class SurveyFeedbackComponent implements OnInit {

  survey: Survey;
  answer: SurveyAnswerSubmition;
  comment: string;

  constructor(protected dialogRef: NbDialogRef<any>, private service: SurveyService, private toastrService: NbToastrService,
              private store: Store) { }

  ngOnInit() {
    const qAnswers: QuestionAnswerSubmition[] = [];
    this.survey.questions.forEach(q => {
      const qa = { questionId: q.id, text: q.text, score: -1};
      qAnswers.push(qa);
    });

    this.answer = { surveyId: this.survey.id, comment: this.comment, questionAnswers: qAnswers };
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

    this.service.postSurveyAnswer(this.answer).subscribe(
      res => {
        this.dialogRef.close({ submit: true });
        this.store.dispatch(new AddSurveyAnswer(res));
      },
      error => this.dialogRef.close({ submit: false, error: true }));
  }

  showWarningToast(position, status) {
    this.toastrService.show(
      status || 'Warning',
      `Please answer all questions before submitting.`,
      { position, status });
  }
}
