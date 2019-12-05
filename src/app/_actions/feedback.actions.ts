/**
 * @author Hamed kadkhodaie, s083485
 * @author Thomas Lien Christensen, s165242
 */

import { FeedbackToCreate, GetFeedbackInputModel } from '../models/feedback/feedback.model';

export class AddFeedback {
    static readonly type = '[Feedback] Add';
    constructor(public payload: FeedbackToCreate) { }
}

export class ChangeFeedback {
    static readonly type = '[Feedback] Put';
    constructor(public payload: boolean) { }
}

export class GetCurrentFeedback {
    static readonly type = '[Feedback] Get';
    constructor(public payload: GetFeedbackInputModel) { }
}
