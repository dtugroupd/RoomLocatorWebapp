/**
 * @author Thomas Lien Christensen, s165242
 * @author Hamed kadkhodaie, s083485
 */

import { Component, OnInit } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Feedback } from 'src/app/models/feedback/feedback.model';
import { FeedbackState } from 'src/app/_states/feedback.state';
import { AddUpvote, AddDownvote } from 'src/app/_actions/feedback.actions';

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
  vote = null;

  @Select(FeedbackState.getVote) currentVote$: Observable<Feedback>;
  constructor(private store: Store) { }

  ngOnInit() {
    this.currentVote$.subscribe(x => {
      this.vote = x;
      console.log("###VOTE: ", x);
    });
  }

  upVote() {
    this.store.dispatch(new AddUpvote());
  }

  downVote() {
    this.store.dispatch(new AddDownvote());
  }
}
