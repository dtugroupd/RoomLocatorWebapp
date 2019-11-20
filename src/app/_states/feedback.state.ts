/**
 * @author Hamed kadkhodaie, s083485
 */
import { State, Action, StateContext, Selector, Select} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Feedback} from '../models/feedback/feedback.model';
import { FeedbackService } from '../_services/feedback.service';
import { AddUpvote, AddDownvote} from '../_actions/feedback.action';


export class FeedbackStateModel {
  
  thumps:Feedback[]
  selectedFeedback: Feedback;
} 

 @State<FeedbackStateModel>({
  name: 'Feedback',
  defaults: {   
    thumps:[],
    selectedFeedback: null
  }
}) 


export class FeedbackState {
  constructor(private feedbackService: FeedbackService) {}
  

  @Selector()
  static getSelectedFeedback(state: FeedbackStateModel) {
      return state.selectedFeedback;
  }


  @Action(AddUpvote)
  upvotedAction({getState, setState}: StateContext<FeedbackStateModel>, {upVotedFeedback}: AddUpvote) {
      return this.feedbackService.addUpvote(upVotedFeedback).pipe(tap(() => {
          const state = getState();
          const filteredArray = state.thumps.filter(item => item.upVotedFeedback !== upVotedFeedback);
          setState({
              ...state,
              thumps: filteredArray,
          });
      }));
  }

  @Action(AddDownvote)
  downvotedAction({getState, setState}: StateContext<FeedbackStateModel>, {downVotedFeedback}: AddDownvote) {
      return this.feedbackService.addUpvote(downVotedFeedback).pipe(tap(() => {
          const state = getState();
          const filteredArray = state.thumps.filter(item => item.downVotedFeedback !== downVotedFeedback);
          setState({
              ...state,
              thumps: filteredArray,
          });
      }));
  }

 }
