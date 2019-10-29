import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Survey } from '../models/mazemap.model';
import { SurveyState } from '../states/survey.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-surveys',
  templateUrl: './manage-surveys.component.html',
  styleUrls: ['./manage-surveys.component.scss']
})

export class ManageSurveysComponent implements OnInit {

  constructor(private store: Store) { }

  surveys: Survey[];

  @Select(SurveyState.getSurveys) surveys$: Observable<Survey[]>;
  
  ngOnInit() {
    this.surveys$.subscribe(x => {
      this.surveys = x;
    });
  }

}
