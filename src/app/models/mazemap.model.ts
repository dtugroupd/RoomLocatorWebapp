export interface Mazemap {
    latitude: number;
    longitude: number;
}

export interface LibrarySection {
    id: number;
    zLevel: number;
    survey: Survey;
    coordinates: Coordinates[];
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Survey {
    id: number;
    questions: Question[];
    surveyAnswers: SurveyAnswer[];
}

export interface Question {
    id: number;
    text: string;
}

export interface SurveyAnswer {
    id: number;
    surveyId: number;
    questionAnswers: QuestionAnswer[];
}

export interface QuestionAnswer {
    id: number;
    questionId: number;
    score: number;
    text: string;
}

export interface SurveyAnswerSubmition {
    surveyId: number;
    questionAnswers: QuestionAnswerSubmition[];
}

export interface QuestionAnswerSubmition {
    questionId: number;
    text: string;
    score: number;
}
