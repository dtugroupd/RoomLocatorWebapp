/**
 * @author Andreas Gøricke, s153804
 * @author Thomas Lien Christensen, s165242
 * @author Hamed kadkhodaie, s083485
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Feedback } from 'src/app/models/feedback/feedback.model';
import { FeedbackState } from 'src/app/_states/feedback.state';
import { AddFeedback, ChangeFeedback, GetCurrentFeedback } from 'src/app/_actions/feedback.actions';
import { TokenState } from 'src/app/_states/token.state';
import { User } from 'src/app/models/login/user.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScadadataService } from '../../_services/scadadata.service';
import { MazemapState } from 'src/app/_states/mazemap.state';
import { MapLocation } from 'src/app/models/mazemap/map-location.model';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

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
export class StatusButtonMenuComponent implements OnInit, OnDestroy {

  thumbsUp = thumbsUp;
  thumbsDown = thumbsDown;
  thumbsUpPressed = thumbsUpPressed;
  thumbsDownPressed = thumbsDownPressed;
  feedback = null;
  vote = null;
  user: User = null;
  activeLocation: MapLocation = null;

  likeState = 'unliked';
  dislikeState = 'undisliked';
  likeIcon = thumbsUp;
  dislikeIcon = thumbsDown;

  temperature = '';
  light = '';
  sound = '';
  availableSeats = '';

  @Select(FeedbackState.getFeedback) currentFeedback$: Observable<Feedback>;
  @Select(MazemapState.getActiveLocation) activeLocation$: Observable<MapLocation>;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor(private store: Store, private service: ScadadataService) { }

  ngOnInit() {
    this.user$.subscribe(u => {
      this.user = u;
    });

    this.activeLocation$.pipe(untilComponentDestroyed(this)).subscribe(x => {
      this.activeLocation = x;
      if (x) {
        if (this.user) {
          this.store.dispatch(new GetCurrentFeedback({ userId: this.user.id, locationId: this.activeLocation.id }));
        }
      }
    });

    this.service.getStatus().subscribe(res => {

      res.details.forEach(element => {
        switch (element.type) {
          case 'Temperature': {
            this.temperature = element.value;
            break;
          }
          case 'Sound': {
            this.sound = element.value;
            break;
          }
          case 'Light': {
            this.light = element.value;
            break;
          }
          case 'Seats Available': {
            this.availableSeats = element.value;
            break;
          }
        }
      });
    });

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

  }

  ngOnDestroy() {}

  upVote() {
    if (this.feedback) {
      this.store.dispatch(new ChangeFeedback(true));
    } else {
      this.store.dispatch(new AddFeedback({ userId: this.user.id, vote: true, locationId: this.activeLocation.id }));
    }
  }

  downVote() {
    if (this.feedback) {
      this.store.dispatch(new ChangeFeedback(false));
    } else {
      this.store.dispatch(new AddFeedback({ userId: this.user.id, vote: false, locationId: this.activeLocation.id }));
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
