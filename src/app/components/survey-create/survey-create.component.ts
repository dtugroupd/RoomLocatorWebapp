/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { QuestionToCreate } from 'src/app/models/question/question-to-create.model';
import { LibrarySection } from 'src/app/models/mazemap/library-section.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { MazemapState } from '../../_states/mazemap.state';
import { Observable } from 'rxjs';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { AddSurvey, AddSurveySuccess, AddSurveyError } from 'src/app/_actions/mazemap.actions';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.scss']
})

export class SurveyCreateComponent implements OnInit {

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;

  title = '';
  description = '';

  questions: QuestionToCreate[];
  activeSection: LibrarySection;

  constructor(private dialogRef: NbDialogRef<any>, private toastrService: NbToastrService, private store: Store, private action$: Actions) {
    this.questions = [{text: ''}, {text: ''}];
   }

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });

    this.action$.pipe(ofActionDispatched(AddSurveySuccess)).subscribe(() => {
      this.dialogRef.close({ submit: true, sectionId: this.activeSection.id });
    });

    this.action$.pipe(ofActionDispatched(AddSurveyError)).subscribe(() => {
      this.dialogRef.close({ submit: false, error: true });
    });
  }

  addQuestion() {
    this.questions.push({ text: '' });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  close() {
    this.dialogRef.close( { submit: false });
  }

  submit() {
    const emptyQuestions = this.questions.filter(q => q.text === '');

    if (!this.title || this.title.length < 4) {
      this.showWarningToast('top-right', 'warning', `Please fill out the required fields.`);
      return;
    }

    if (emptyQuestions.length !== this.questions.length) {
      const survey = {
        sectionId: this.activeSection.id,
        title: this.title,
        description: this.description,
        questions: this.questions
      };
      this.store.dispatch(new AddSurvey(survey));
    } else {
      this.showWarningToast('top-right', 'warning', `Can't submit an empty survey`);
      return;
    }
  }

  showWarningToast(position, status, message) {
    this.toastrService.show(
      status || 'Warning',
      message,
      { position, status });
  }

}
