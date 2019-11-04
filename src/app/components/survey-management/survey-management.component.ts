/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey/survey.model';
import { LibrarySection } from 'src/app/models/mazemap/library-section.model';
import { Store, Select } from '@ngxs/store';
import { SurveyState } from '../../_states/survey.state';
import { Observable } from 'rxjs';
import { MazemapState } from '../../_states/mazemap.state';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.scss']
})

export class SurveyManagementComponent implements OnInit {
  constructor(private store: Store) { }

  surveys: Survey[];
  unsortedSurveys: Survey[];
  activeSection: LibrarySection;
  faPlusSquare = faPlusSquare;
  faDownload = faDownload;
  faComments = faComments;
  faTrashAlt = faTrashAlt;

  activeStyle = {'background-color': '#ddd'};

  @Select(SurveyState.getSurveys) surveys$: Observable<Survey[]>;
  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;

  ngOnInit() {
    this.surveys$.subscribe(x => {
      this.surveys = x;
      this.unsortedSurveys = Object.create(x);
    });

    this.activeSection$.subscribe(x => {
      this.activeSection = x;
      this.surveys = Object.create(this.unsortedSurveys);
      console.log(this.surveys);
      console.log(this.unsortedSurveys);

      if (x) {
        const indexOfSurvey = this.surveys.map(s => s.id).indexOf(x.survey.id);
        console.log(indexOfSurvey);
        if (indexOfSurvey > 0) {
          this.surveys.splice(indexOfSurvey, 1);
          this.surveys.unshift(x.survey);
        }
      } else {
        this.surveys = this.unsortedSurveys;
      }
    });
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

}
