import { QuestionToCreate } from '../question/question-to-create.model';

export interface SurveyToCreate {
    sectionId: number;
    title: string;
    description: string;
    questions: QuestionToCreate[];
}