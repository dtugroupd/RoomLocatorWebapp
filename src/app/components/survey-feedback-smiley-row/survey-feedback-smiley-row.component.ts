/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faMeh, faGrin, faFrown } from '@fortawesome/free-solid-svg-icons';
import { faMeh as faMehReg,
         faGrin as faGrinReg,
         faFrown as faFrownReg,
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-survey-feedback-smiley-row',
  templateUrl: './survey-feedback-smiley-row.component.html',
  styleUrls: ['./survey-feedback-smiley-row.component.scss']
})
export class SurveyFeedbackSmileyRowComponent implements OnInit {

  faFrown = faFrown;
  faMeh = faMeh;
  faGrin = faGrin;
  faFrownReg = faFrownReg;
  faMehReg = faMehReg;
  faGrinReg = faGrinReg;

  @Input() score: number;
  @Output() newScore = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateScore(score: number) {
    this.score = score;
    this.newScore.emit(this.score);
  }
}
