/**
 * @author Hamed kadkhodaie, s083485
 */
import { State, Action, StateContext, Selector, Select} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Feedback} from '../models/feedback/feedback.model';
import { FeedbackService } from '../_services/feedback.service';
import { AddUpvote, AddDownvote} from '../_actions/feedback.action';


export class FeedbackStateModel {
//   thumps:Feedback[]
  feedback: Feedback
} 

 @State<FeedbackStateModel>({
  name: 'Feedback',
  defaults: {   
    feedback: null
  }
}) 


export class FeedbackState {
  constructor(private feedbackService: FeedbackService) {}
  

  @Selector()
  static getVote(state: FeedbackStateModel) {
      return state.feedback.vote;
  }


  @Action(AddUpvote)
  upvotedAction({getState, patchState}: StateContext<FeedbackStateModel>) {
      return this.feedbackService.addUpvote(true).pipe(tap(() => {
          const state = getState();
        //   const filteredArray = state.thumps.filter(item => item.upVotedFeedback !== upVotedFeedback);
          patchState({
              feedback: state.feedback.vote ? { vote: null } : { vote: true }
          });
      }));
  }

  @Action(AddDownvote)
  downvotedAction({getState, setState}: StateContext<FeedbackStateModel>) {
      return this.feedbackService.addUpvote(false).pipe(tap(() => {
          const state = getState();
        //   const filteredArray = state.thumps.filter(item => item.downVotedFeedback !== downVotedFeedback);
          setState({
              feedback: state.feedback.vote ? { vote: false } : { vote: null }, 
          });
      }));
  }

 }
