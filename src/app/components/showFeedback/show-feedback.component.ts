/**
 * @author Amal Qasim, s132957 
 * **/ 
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Survey } from 'src/app/models/survey/survey.model';

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss']
})

export class ShowFeedbackComponent implements OnInit {


  survey: Survey;
  constructor(private dialog: NbDialogRef<any>) { }

  ngOnInit() {
  
  }

  close(){
    this.dialog.close();
    }
  
}

