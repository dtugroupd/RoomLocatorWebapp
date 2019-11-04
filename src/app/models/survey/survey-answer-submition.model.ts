import { QuestionAnswerSubmition } from '../question/question-answer-submition.model';

export interface SurveyAnswerSubmition {
    surveyId: number;
    comment: string;
    questionAnswers: QuestionAnswerSubmition[];
}