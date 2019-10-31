import { Component, OnInit } from '@angular/core';
import { faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-thumbs-down',
  templateUrl: './thumbs-down.component.html',
  styleUrls: ['./thumbs-down.component.scss']
})
export class ThumbsDownComponent implements OnInit {

  thumbsDown = thumbsDown;
  thumbsDownPressed = thumbsDownPressed;
  downVoted = -1;

  constructor() { }

  ngOnInit() {
  }

  downVote(){

  }
}
