/**
 * @author Hamed kadkhodaie, s083485
 * @author Thomas Lien Christensen, s165242
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Feedback } from '../models/feedback/feedback.model';
import { FeedbackService } from '../_services/feedback.service';
import { AddFeedback, ChangeFeedback, GetCurrentFeedback } from '../_actions/feedback.actions';
import { tap } from 'rxjs/operators';

export class FeedbackStateModel {
    feedback: Feedback;
}

@State<FeedbackStateModel>({
    name: 'Feedback',
    defaults: {
        feedback: null,
    }
})

export class FeedbackState {

    constructor(private feedbackService: FeedbackService) { }

    @Selector()
    static getFeedback(state: FeedbackStateModel) {
        return state.feedback;
    }

    @Action(AddFeedback)
    addVote({ setState }: StateContext<FeedbackStateModel>, { payload }: AddFeedback) {
        return this.feedbackService.addFeedback(payload).pipe(tap((result) => {
            setState({
                feedback: result
            });
        }));
    }

    @Action(GetCurrentFeedback)
    getCurrentFeedback({ setState }: StateContext<FeedbackStateModel>, { payload }: GetCurrentFeedback) {
        return this.feedbackService.getCurrentFeedback(payload).pipe(tap((result) => {
            setState({
                feedback: result
            });
        }));
    }

    @Action(ChangeFeedback)
    changeFeedback({ getState, setState }: StateContext<FeedbackStateModel>, { payload }: ChangeFeedback) {
        const state = getState();
        const feedbackToUpdate = { id: state.feedback.id, vote: payload };
        return this.feedbackService.changeFeedback(feedbackToUpdate).pipe(tap((result) => {
            setState({
                feedback: result
            });
        }));
    }
}
