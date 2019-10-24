import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Select, Store } from '@ngxs/store';
import { MazemapState } from '../states/mazemap.state';
import { LibrarySection } from '../models/mazemap.model';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { SetFeedbackExpanded } from '../actions/mazemap.action';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0%',
        opacity: 0.0,
      })),
      // transition('* => *', [
      //   animate('200ms ease-in-out')
      // ])
      transition('open => closed', [
        animate('0.25s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.25s ease-in-out')
      ]),
    ])
  ]
})

export class FeedbackButtonComponent implements OnInit {

  activeSection: LibrarySection;
  isExpanded = false;
  upVoted = false;
  downVoted = false;
  thumbsUp = thumbsUp;
  thumbsDown = thumbsDown;
  thumbsUpPressed = thumbsUpPressed;
  thumbsDownPressed = thumbsDownPressed;

  @Select(MazemapState.getActiveSection) activeSection$: Observable<LibrarySection>;
  @Select(MazemapState.isFeedbackExpanded) isExpanded$: Observable<boolean>;

  constructor(private store: Store, private dialogService: NbDialogService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.activeSection$.subscribe(x => {
      this.activeSection = x;
    });

    this.isExpanded$.subscribe(x => {
      this.isExpanded = x;
    });
  }

  openDialog() {
    const surveyContext = { survey: this.activeSection.survey};
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: surveyContext };
    this.dialogService.open(FeedbackComponent, settings).onClose.subscribe(res => {
     if (res === undefined) {
       return;
     }

     if (res.submit === true) {
      this.showFeedbackToast('top-right', 'success');
     }

     if (res.error === true) {
      this.showGeneralErrorToast('top-right', 'warning');
     }
    });
  }

  showFeedbackToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Thanks for your feedback!`,
      { position, status });
  }

  showGeneralErrorToast(position, status) {
    this.toastrService.show(
      status || 'Warning',
      `Something went wrong.`,
      { position, status });
  }

  toggleExpanded() {
    this.store.dispatch(new SetFeedbackExpanded(!this.isExpanded));
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
