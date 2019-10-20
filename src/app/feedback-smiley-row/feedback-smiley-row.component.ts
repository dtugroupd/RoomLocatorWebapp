import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faMeh, faSmile, faGrin, faFrown, faAngry } from '@fortawesome/free-solid-svg-icons';
import { faMeh as faMehReg,
         faSmile as faSmileReg,
         faGrin as faGrinReg,
         faFrown as faFrownReg,
         faAngry as faAngryReg
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-feedback-smiley-row',
  templateUrl: './feedback-smiley-row.component.html',
  styleUrls: ['./feedback-smiley-row.component.scss']
})
export class FeedbackSmileyRowComponent implements OnInit {

  faAngry = faAngry;
  faFrown = faFrown;
  faMeh = faMeh;
  faSmile = faSmile;
  faGrin = faGrin;
  faAngryReg = faAngryReg;
  faFrownReg = faFrownReg;
  faMehReg = faMehReg;
  faSmileReg = faSmileReg;
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
