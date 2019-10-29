import { Component, OnInit, Input } from '@angular/core';
import { Survey } from '../models/mazemap.model';

@Component({
  selector: 'app-survey-list-item',
  templateUrl: './survey-list-item.component.html',
  styleUrls: ['./survey-list-item.component.scss']
})
export class SurveyListItemComponent implements OnInit {

  @Input() survey: Survey;

  constructor() { }

  ngOnInit() {
  }

}
