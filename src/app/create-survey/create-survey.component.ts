import { Component, OnInit, Input } from '@angular/core';
import { QuestionToCreate } from '../models/mazemap.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})

export class CreateSurveyComponent implements OnInit {

  @Input() sectionId: number;

  questions: QuestionToCreate[];

  constructor(private dialogRef: NbDialogRef<any>, private service: SurveyService, private toastrService: NbToastrService) {
    this.questions = [{text: ''}, {text: ''}];
   }

  ngOnInit() {
  }

  addQuestion() {
    this.questions.push({ text: '' });
  }

  close() {
    this.dialogRef.close( { submit: false });
  }

  submit() {
    const emptyQuestions = this.questions.filter(q => q.text === '');
    if ( emptyQuestions.length !== this.questions.length) {
      this.service.createSurvey({ sectionId: this.sectionId, questions: this.questions});
      this.dialogRef.close({ submit: true, sectionId: this.sectionId });
    } else {
      this.showErrorToast('top-right', 'warning');
    }
  }

  showErrorToast(position, status) {
    this.toastrService.show(
      status || 'Warning',
      `Can't submit an empty survey`,
      { position, status });
  }
}
