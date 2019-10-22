import { Component, OnInit, Input } from '@angular/core';
import { Survey } from '../models/mazemap.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FeedbackComponent } from '../feedback/feedback.component';
import { CreateSurveyComponent } from '../create-survey/create-survey.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})

export class SurveyComponent implements OnInit {

  public model: Survey;
  public sectionId: number;

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit() { }

  openDialog() {
    const surveyContext = { survey: this.model };
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: surveyContext };
    this.dialogService.open(FeedbackComponent, settings).onClose.subscribe(res => {
     if (res.submit === true) {
      this.showFeedbackToast('bottom-left', 'success');
     }

     if (res.error === true) {
      this.showGeneralErrorToast('bottom-left', 'warning');
     }
    });
  }

  openCreateSurveyDialog() {
    const sectionContext =  { sectionId: this.sectionId };
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: sectionContext };
    this.dialogService.open(CreateSurveyComponent, settings).onClose.subscribe(res => {
     if (res.submit === true) {
      this.showCreateSurveyToast('top-right', 'success', res.sectionId);
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


  showCreateSurveyToast(position, status, sectionId) {
    this.toastrService.show(
      status || 'Success',
      `Survey created on section ${sectionId}`,
      { position, status });
  }
}