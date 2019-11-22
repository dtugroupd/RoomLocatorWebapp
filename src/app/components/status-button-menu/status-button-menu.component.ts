/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import { AddUpvote, AddDownvote } from '../../_actions/feedback.action';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FeedbackState } from '../../_states/feedback.state';
import { Feedback } from '../../models/feedback/feedback.model';

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

  @Select(FeedbackState.getSelectedFeedback) selectedFeedback: Observable<Feedback>;
  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { 
    this.initVote;
  }

  ngOnInit() {
  }

  initVote(){

    this.upVoted;
    this.downVoted;
  }

  upVote() {
    if (this.downVoted === true) {
      this.downVoted = false;
    }

    else {
      this.store.dispatch(new AddUpvote(this.upVoted));
      this.upVoted = !this.upVoted;
}

    
  }

  downVote() {
    if (this.upVoted === true) {
      this.upVoted = false;
    }

    else {
      this.store.dispatch(new AddDownvote(this.upVoted));
      this.upVoted = !this.upVoted;
}
  
  }
}
