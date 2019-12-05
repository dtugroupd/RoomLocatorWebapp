/**
 * @author Hamed kadkhodaie, s083485
 * @author Thomas Lien Christensen, s165242
 */

export interface FeedbackToCreate {
    userId: string;
    vote: boolean;
    locationId: string;
}

export interface FeedbackToUpdate {
    id: string;
    vote: boolean;
    locationId: string;
}

export interface Feedback {
    id: string;
    vote: boolean;
    timeStamp: string;
    locationId: string;
}

export interface GetFeedbackInputModel {
    userId: string;
    locationId: string;
}
