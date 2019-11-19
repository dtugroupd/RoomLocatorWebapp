import { SurveyAnswer } from '../models/survey/survey-answer.model';

export class GetLibrarySections {
    static readonly type = '[LibrarySection] Get';
}

export class SetActiveSection {
    static readonly type = '[Any] Set';
    constructor(public section: any) {}
}

export class SetActivateFeedbackAndStatus {
    static readonly type = '[Boolean] Set';
    constructor(public activate: boolean) {}
}

export class GetSurveys {
    static readonly type = '[Survey Get]';
}

export class AddSurveyAnswer {
    static readonly type = '[SurveyAnswer Set]';
    constructor(public payload: SurveyAnswer) { }
}