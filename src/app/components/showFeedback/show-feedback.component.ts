import { Component, OnInit } from '@angular/core';
import { Store, Selector, Select } from '@ngxs/store';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { MazemapState } from 'src/app/_states/mazemap.state';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/models/survey/survey.model';
import { SurveyAnswer } from 'src/app/models/survey/survey-answer.model';

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss']
})

export class ShowFeedbackComponent implements OnInit {

  @Select(MazemapState.getSurveys) surveys$: Observable<Survey[]>;

  constructor(private store: Store, private dialog: NbDialogRef<any>) { }

  ngOnInit() {
  
  }

  close(){
    this.dialog.close();
    }
  
}

