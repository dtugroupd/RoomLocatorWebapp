/**
 * @author Hamed kadkhodaie, s083485
 */
import { Feedback } from '../models/feedback/feedback.model';


export class SetFeedback {
    static readonly type = '[Feedback] Add';
    
    constructor(public payload: Feedback){}
}

export class AddUpvote {
    static readonly type = '[Feedback] Add';

    constructor(public upVotedFeedback: boolean) {
    }
}

export class AddDownvote {
    static readonly type = '[Feedback] Add';

    constructor(public downVotedFeedback: boolean) {
    }
}

