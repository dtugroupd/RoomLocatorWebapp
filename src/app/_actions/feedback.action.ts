/**
 * @author Hamed kadkhodaie, s083485
 */
import { Feedback } from '../models/feedback/feedback.model';


export class SetFeedback {
    static readonly type = '[Feedback] Add';
    
    constructor(public payload: Feedback){}
}

