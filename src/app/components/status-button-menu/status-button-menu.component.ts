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
import { trigger, state, style, animate, transition } from '@angular/animations';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-status-button-menu',
  templateUrl: './status-button-menu.component.html',
  styleUrls: ['./status-button-menu.component.scss'],
  animations: [
    trigger('like', [
      state('unliked', style({
        color: '#ccc',
        opacity: '0.75',
        transform: 'scale(1)'
      })),
      state('liked', style({
        color: '#3366ff',
        opacity: '1',
        transform: 'scale(1.1)'
      })),
      transition('unliked <=> liked', animate('100ms ease-out'))
    ]),
    trigger('dislike', [
      state('undisliked', style({
        color: '#ccc',
        opacity: '0.75',
        transform: 'scale(1)'
      })),
      state('disliked', style({
        color: '#3366ff',
        opacity: '1',
        transform: 'scale(1.1)'
      })),
      transition('undisliked <=> disliked', animate('100ms ease-out'))
    ])
  ]
})
export class StatusButtonMenuComponent implements OnInit {

  thumbsUp = thumbsUp;
  thumbsDown = thumbsDown;
  thumbsUpPressed = thumbsUpPressed;
  thumbsDownPressed = thumbsDownPressed;
  feedback = null;
  vote = null;
  user: User = null;

  likeState = 'unliked';
  dislikeState = 'undisliked';
  likeIcon = thumbsUp;
  dislikeIcon = thumbsDown;

  @Select(FeedbackState.getFeedback) currentFeedback$: Observable<Feedback>;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentFeedback$.subscribe(x => {
      this.feedback = x;
      if (x) {
        this.vote = x.vote;
        if (this.vote === null) {
          this.setNull();
        } else {
          this.vote ?
            this.setLiked() :
            this.setDisliked();
        }
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

  setLiked() {
    this.likeState = 'liked';
    this.likeIcon = thumbsUpPressed;
    this.dislikeState = 'undisliked';
    this.dislikeIcon = thumbsDown;
  }

  setDisliked() {
    this.dislikeState = 'disliked';
    this.dislikeIcon = thumbsDownPressed;
    this.likeState = 'unliked';
    this.likeIcon = thumbsUp;
  }

  setNull() {
    this.likeState = 'unliked';
    this.dislikeState = 'undisliked';
    this.likeIcon = thumbsUp;
    this.dislikeIcon = thumbsDown;
  }
}
