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
import { AddFeedback, ChangeFeedback } from 'src/app/_actions/feedback.actions';
import { TokenState } from 'src/app/_states/token.state';
import { User } from 'src/app/models/login/user.model';

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
  feedback = null;
  vote = null;
  user: User = null;

  @Select(FeedbackState.getFeedback) currentFeedback$: Observable<Feedback>;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {


    this.currentFeedback$.subscribe(x => {
      this.feedback = x;
      if (x) {
        this.vote = x.vote;
      }
    });

    this.user$.subscribe(u => {
      this.user = u;
    });

  }

  upVote() {
    if (this.feedback) {
      this.store.dispatch(new ChangeFeedback(true));
    } else {
      this.store.dispatch(new AddFeedback({ userId: this.user.id, vote: true }));
    }
  }

  downVote() {
    if (this.feedback) {
      this.store.dispatch(new ChangeFeedback(false));
    } else {
      this.store.dispatch(new AddFeedback({ userId: this.user.id, vote: false }));
    }
  }
}
