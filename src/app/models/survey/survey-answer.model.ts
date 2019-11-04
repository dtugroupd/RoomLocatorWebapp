import { QuestionAnswer } from '../question/question-answer.model';

export interface SurveyAnswer {
    id: number;
    surveyId: number;
    comment: string;
    questionAnswers: QuestionAnswer[];
}