/**
 * @author Hamed kadkhodaie, s083485
 */
import { Feedback } from '../models/feedback/feedback.model';

export class AddUpvote {
    static readonly type = '[Feedback] SetPositive';
}

export class AddDownvote {
    static readonly type = '[Feedback] SetNegative';
}

