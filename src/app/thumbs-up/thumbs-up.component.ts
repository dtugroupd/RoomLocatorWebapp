import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-thumbs-up',
  templateUrl: './thumbs-up.component.html',
  styleUrls: ['./thumbs-up.component.scss']
})
export class ThumbsUpComponent implements OnInit {

  thumbsUp = thumbsUp;
  thumbsUpPressed = thumbsUpPressed;
  thumbsDown = thumbsDown;
  thumbsDownPressed = thumbsDownPressed;
  upVoted = 1;
  

  constructor() { }

  ngOnInit() {
  }

  upVote(){

  }

}
