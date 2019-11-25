/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey/survey.model';
import { LibrarySection } from 'src/app/models/mazemap/library-section.model';
import { Select, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MazemapState } from '../../_states/mazemap.state';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SurveyService } from 'src/app/_services/survey.service';
import { AddSurveySuccess } from 'src/app/_actions/mazemap.actions';
import { NbDialogService } from '@nebular/theme';
import { ShowFeedbackComponent } from '../showFeedback/show-feedback.component';

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.scss']
})
export class SurveyManagementComponent implements OnInit {
  constructor(private service: SurveyService, private action$: Actions, private dialogService: NbDialogService) {}

  surveys: Survey[];
  unsortedSurveys: Survey[];
  activeSection: LibrarySection;
  faPlusSquare = faPlusSquare;
  faDownload = faDownload;
  faComments = faComments;
  faTrashAlt = faTrashAlt;

  activeStyle = {'background-color': '#ddd'};

  @Select(MazemapState.getSurveys) surveys$: Observable<Survey[]>;
  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;

  ngOnInit() {
    this.surveys$.subscribe(x => {
      this.surveys = x;
      this.unsortedSurveys = Object.create(x);
    });

    this.activeSection$.subscribe(x => {
      this.activeSection = x;
      if (this.activeSection) {
        this.toggleActiveSurvey(this.activeSection.survey);
      }
    });

    this.action$.pipe(ofActionDispatched(AddSurveySuccess)).subscribe(() => {
      this.toggleActiveSurvey(this.activeSection.survey);
    });
  }

  toggleActiveSurvey(survey: Survey) {
    this.surveys = Object.create(this.unsortedSurveys);

    if (this.activeSection) {
      const indexOfSurvey = this.surveys.map(s => s.id).indexOf(survey.id);
      if (indexOfSurvey > 0) {
        this.surveys.splice(indexOfSurvey, 1);
        this.surveys.unshift(survey);
      }
    } else {
      this.surveys = this.unsortedSurveys;
    }
  }

  isActive(index: number) {
    if (this.activeSection) {
      return this.surveys[index].id === this.activeSection.survey.id;
    }

    return false;
  }

  surveyResponseNum(survey: Survey) {
    const surveyAnswersCount = survey.surveyAnswers.length;
    return surveyAnswersCount > 99 ? '99+' : `${surveyAnswersCount}`;
  }

  downloadFile(id: number) {
    this.service.downloadSurveyAnswers(id);
  }

  open() {
    console.log('VIRKER');
    // const surveyContext = { survey: this.activeSection.survey};
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true  };
    this.dialogService.open(ShowFeedbackComponent, {context: 'THIS IS A TEST'})
  }
}
