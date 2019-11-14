import { SurveyAnswer } from '../models/survey/survey-answer.model';

export class GetSurveys {
    static readonly type = '[Survey Get]';
}

export class AddSurveyAnswer {
    static readonly type = '[SurveyAnswer Set]';
    constructor(public payload: SurveyAnswer) {}
}