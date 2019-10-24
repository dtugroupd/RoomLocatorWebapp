import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Select } from '@ngxs/store';
import { MazemapState } from '../states/mazemap.state';
import { LibrarySection } from '../models/mazemap.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss']
})

export class FeedbackButtonComponent implements OnInit {

  activeSection: LibrarySection;

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });
  }

  openDialog() {
    const surveyContext = { survey: this.activeSection.survey};
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: surveyContext };
    this.dialogService.open(FeedbackComponent, settings).onClose.subscribe(res => {
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
