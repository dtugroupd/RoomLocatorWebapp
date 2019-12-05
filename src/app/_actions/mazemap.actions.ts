import { SurveyToCreate } from '../models/survey/survey-to-create.model';
import { SurveyAnswerSubmition } from '../models/survey/survey-answer-submition.model';
import { Event } from '../models/calendar/event.model';

export class GetLocations {
    static readonly type = '[Locations] Get';
}

export class SetActiveLocation {
    static readonly type = '[ActiveLocation] Set';
    constructor(public payload: string) { }
}

export class ToggleFlyToComplete {
    static readonly type = '[FlyToComplete] Toggle';
}
export class ResetActiveLocation {
    static readonly type = '[ActiveLocation] Reset';
}

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

export class AddSurveyAnswer {
    static readonly type = '[SurveyAnswer Set]';
    constructor(public payload: SurveyAnswerSubmition) { }
}

export class AddSurveyAnswerSuccess {
    static readonly type = '[Void Success]';
}

export class AddSurveyAnswerError {
    static readonly type = '[Void Error]';
}

export class AddEventToLocation {
    static readonly type = '[Location.Event] Add';
    constructor(public payload: Event) { }
}