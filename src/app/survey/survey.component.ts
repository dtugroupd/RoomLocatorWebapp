import { Component, OnInit, Input } from '@angular/core';
import { Survey } from '../models/mazemap.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})

export class SurveyComponent implements OnInit {

  public model: Survey;

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit() {
    console.log(this.model);
  }

  openDialog() {
    const surveyContext = { survey: this.model };
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: surveyContext };
    this.dialogService.open(FeedbackComponent, settings).onClose.subscribe(submit => {
     if (submit === true) {
      this.showToast('bottom-left', 'success');
     }
    });
  }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Thanks for your feedback!`,
      { position, status });
  }
}
