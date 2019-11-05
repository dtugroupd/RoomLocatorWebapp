/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey/survey.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SurveyCreateComponent } from '../survey-create/survey-create.component';

@Component({
  selector: 'app-survey-create-action',
  templateUrl: './survey-create-action.component.html',
  styleUrls: ['./survey-create-action.component.scss']
})

export class SurveyCreateActionComponent implements OnInit {

  public model: Survey;
  public sectionId: number;

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit() { }

  openCreateSurveyDialog() {
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true };
    this.dialogService.open(SurveyCreateComponent, settings).onClose.subscribe(res => {
     if (res.submit === true) {
      this.showCreateSurveyToast('top-right', 'success', res.sectionId);
     }

     if (res.error === true) {
       this.showGeneralErrorToast('top-right', 'warning');
     }
    });
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
