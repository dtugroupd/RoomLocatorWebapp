import { SurveyAnswer } from '../models/survey/survey-answer.model';
import { SurveyToCreate } from '../models/survey/survey-to-create.model';

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

export class AddSurvey {
    static readonly type = '[Survey Set]';
    constructor(public payload: SurveyToCreate) { }
}

export class AddSurveySuccess {
    static readonly type = '[Void Success]';
}

export class AddSurveyError {
    static readonly type = '[Void Error]';
}