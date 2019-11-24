/**
 * @author Hamed kadkhodaie, s083485
 * @author Thomas Lien Christensen, s165242
 */

export interface FeedbackToCreate {
    userId: string;
    vote: boolean;
}

export interface FeedbackToUpdate {
    id: string;
    vote: boolean;
}

export interface Feedback {
    id: string;
    vote: boolean;
    timeStamp: string;
}

