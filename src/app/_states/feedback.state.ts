/**
 * @author Hamed kadkhodaie, s083485
 */
import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {Feedback} from '../models/feedback/feedback.model';
import { FeedbackService } from '../_services/feedback.service';
import {SetFeedback} from '../_actions/feedback.action'


export class FeedbackStateModel {
  
  Thumps:Feedback[]
} 

 @State<FeedbackStateModel>({
  
  name: 'Feedback',
  defaults: {
      
    Thumps:[]
  }
}) 


export class FeedbackState {
  

  constructor(private feedbackService: FeedbackService) {}
 
  @Selector()
  static setThumps(state: FeedbackStateModel) {
      return state.Thumps;
  }

  @Action(SetFeedback)
  add({getState, patchState }: StateContext<FeedbackStateModel>, { payload }:SetFeedback) {
      const state = getState();
      patchState({
        Thumps: [...state.Thumps, payload]
      })
  

}
}