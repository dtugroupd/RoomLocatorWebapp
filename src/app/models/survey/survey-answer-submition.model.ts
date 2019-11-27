import { QuestionAnswerSubmition } from '../question/question-answer-submition.model';

export interface SurveyAnswerSubmition {
    surveyId: string;
    comment: string;
    questionAnswers: QuestionAnswerSubmition[];
}