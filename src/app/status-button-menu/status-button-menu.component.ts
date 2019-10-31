
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-status-button-menu',
  templateUrl: './status-button-menu.component.html',
  styleUrls: ['./status-button-menu.component.scss']
})
export class StatusButtonMenuComponent {

  thumbsDown = thumbsDown;
  thumbsDownPressed = thumbsDownPressed;
  thumbsUp = thumbsUp;
  thumbsUpPressed = thumbsUpPressed;
  upVoted = false;
  downVoted = false;

  selectedThumbsup: boolean = true
  selectedThumbsdown: boolean = false

  @Output()
  countThumbpsupChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
   
  @Output()
  countThumbpsdownChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  onThumbsupChanged(){
    if (this.downVoted === true){
      this.downVoted = false;
    }

    this.countThumbpsupChanged.emit(this.upVoted=true);
    console.log(this.selectedThumbsup);
  }

  onThumbsdownChanged(){
    if (this.upVoted === true) {
      this.upVoted = false;
    }

    this.countThumbpsupChanged.emit(this.downVoted=true);
    console.log(this.selectedThumbsdown);
  }

}
