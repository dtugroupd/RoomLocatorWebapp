import { QuestionAnswer } from '../question/question-answer.model';

export interface SurveyAnswer {
    id: string;
    surveyId: string;
    comment: string;
    questionAnswers: QuestionAnswer[];
}