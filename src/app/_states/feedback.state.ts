/**
 * @author Hamed kadkhodaie, s083485
 * @author Thomas Lien Christensen, s165242
 */

import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { SurveyService } from '../_services/survey.service';
import { Feedback } from '../models/feedback/feedback.model';
import { FeedbackService } from '../_services/feedback.service';
import { AddUpvote, AddDownvote } from '../_actions/feedback.actions';
import { tap } from 'rxjs/operators';

export class FeedbackStateModel {
    feedback: Feedback;
}

@State<FeedbackStateModel>({
    name: 'Feedback',
    defaults: {
        feedback: { vote: null },
    }
})

export class FeedbackState {

    constructor(private feedbackService: FeedbackService) { }

    @Selector()
    static getVote(state: FeedbackStateModel) {
        return state.feedback.vote;
    }

    @Action(AddUpvote)
    addUpvote({ getState, setState }: StateContext<FeedbackStateModel>) {
        // return this.feedbackService.addUpvote(true).pipe(tap(() => {
            const state = getState();
            setState({
                feedback: state.feedback.vote ? { vote: null } : { vote: true }
            });
        // }));
    }

    @Action(AddDownvote)
    addDownvote({ getState, setState }: StateContext<FeedbackStateModel>) {
        // return this.feedbackService.addUpvote(false).pipe(tap(() => {
        const state = getState();
        const isNull = getState().feedback.vote === null;
        setState({
            feedback:
                isNull ?
                    { vote: false } :
                    state.feedback.vote ?
                        { vote: false } :
                        { vote: null },
        });
        // }));
    }
}
