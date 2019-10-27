import { Component, OnInit } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-status-button-menu',
  templateUrl: './status-button-menu.component.html',
  styleUrls: ['./status-button-menu.component.scss']
})
export class StatusButtonMenuComponent implements OnInit {

  thumbsUp = thumbsUp;
  thumbsDown = thumbsDown;
  thumbsUpPressed = thumbsUpPressed;
  thumbsDownPressed = thumbsDownPressed;
  upVoted = false;
  downVoted = false;

  constructor() { }

  ngOnInit() {
  }

  upVote() {
    if (this.downVoted === true) {
      this.downVoted = false;
    }

    this.upVoted = !this.upVoted;
  }

  downVote() {
    if (this.upVoted === true) {
      this.upVoted = false;
    }

    this.downVoted = !this.downVoted;
  }
}
