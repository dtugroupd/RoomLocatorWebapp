import { Question } from '../question/question.model';
import { SurveyAnswer } from './survey-answer.model';

export interface Survey {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    surveyAnswers: SurveyAnswer[];
}
