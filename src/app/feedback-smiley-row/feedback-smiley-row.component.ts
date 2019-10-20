import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faMeh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feedback-smiley-row',
  templateUrl: './feedback-smiley-row.component.html',
  styleUrls: ['./feedback-smiley-row.component.scss']
})
export class FeedbackSmileyRowComponent implements OnInit {

  faMeh = faMeh;

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
