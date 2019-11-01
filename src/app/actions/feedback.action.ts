import { Feedback } from '../models/feedback.model';


export class SetFeedback {
    static readonly type = '[Feedback] Set';
    
    constructor(public payload: Feedback){}
}

