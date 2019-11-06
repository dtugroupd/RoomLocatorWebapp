/**
 * @author Hamed kadkhodaie, s083485
 */
import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {Feedback} from '../models/feedback/feedback.model';
import {tap} from 'rxjs/operators';
import { FeedbackService } from '../_services/feedback.service';
import { SetFeedback } from '../_actions/feedback.action';

export class FeedbackStateModel {
  upVoted:Feedback[]
  downVoted:Feedback[];
} 

@State<FeedbackStateModel>({
  name: 'Feedback',
  defaults: {
    upVoted: null,
    downVoted: null,
      
  }
})

export class FeedbackState {

  constructor(private feedbackService: FeedbackService) {}

  @Selector()
  static setUpvoted(state: FeedbackStateModel) {
      return state.upVoted;
  }

  @Selector()
  static setDownvoted(state: FeedbackStateModel) {
      return state.downVoted;
  }

  @Action(SetFeedback)
  setFeedbackUpvoted({getState, setState}: StateContext<FeedbackStateModel>) {
      return this.feedbackService.fetchUpvoted().pipe(tap((result) => {
          const state = getState();
          setState({
              ...state,
              upVoted: result,
          });
      }));
  }

  @Action(SetFeedback)
  setFeedbackDownvoted({getState, setState}: StateContext<FeedbackStateModel>) {
      return this.feedbackService.fetchDownvoted().pipe(tap((result) => {
          const state = getState();
          setState({
              ...state,
              downVoted: result,
          });
      }));
  }


}