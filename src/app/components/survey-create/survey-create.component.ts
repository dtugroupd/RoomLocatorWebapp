/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit, Input } from '@angular/core';
import { QuestionToCreate } from 'src/app/models/question/question-to-create.model';
import { LibrarySection } from 'src/app/models/mazemap/library-section.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SurveyService } from '../../_services/survey.service';
import { MazemapState } from '../../_states/mazemap.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.scss']
})

export class SurveyCreateComponent implements OnInit {

  // @Input() sectionId: number;
  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;

  title = '';
  description = '';

  questions: QuestionToCreate[];
  activeSection: LibrarySection;

  constructor(private dialogRef: NbDialogRef<any>, private service: SurveyService, private toastrService: NbToastrService) {
    this.questions = [{text: ''}, {text: ''}];
   }

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });
  }

  addQuestion() {
    this.questions.push({ text: '' });
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

      this.service.createSurvey(survey).subscribe(res => {
        if (res === null) {
          this.dialogRef.close({ submit: true, sectionId: this.activeSection.id });
          } else {
            this.dialogRef.close({ submit: false, error: true });
          }
      });
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