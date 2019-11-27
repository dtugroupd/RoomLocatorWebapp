/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/models/mazemap/section.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SurveyFeedbackComponent } from '../survey-feedback/survey-feedback.component';
import { Select, Store } from '@ngxs/store';
import { MazemapState } from '../../_states/mazemap.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-survey-feedback-button',
  templateUrl: './survey-feedback-button.component.html',
  styleUrls: ['./survey-feedback-button.component.scss']
})

export class SurveyFeedbackButtonComponent implements OnInit {

  activeSection: Section;
  isExpanded = false;
  upVoted = false;
  downVoted = false;

  @Select(MazemapState.getActiveSection) activeSection$: Observable<Section>;

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });

  }

  openDialog() {
    const surveyContext = { survey: this.activeSection.survey};
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: surveyContext };
    this.dialogService.open(SurveyFeedbackComponent, settings).onClose.subscribe(res => {
     if (res === undefined) {
       return;
     }

     if (res.submit === true) {
      this.showFeedbackToast('top-right', 'success');
     }

     if (res.error === true) {
      this.showGeneralErrorToast('top-right', 'warning');
     }
    });
  }

  showFeedbackToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Thanks for your feedback!`,
      { position, status });
  }

  showGeneralErrorToast(position, status) {
    this.toastrService.show(
      status || 'Warning',
      `Something went wrong.`,
      { position, status });
  }

}
