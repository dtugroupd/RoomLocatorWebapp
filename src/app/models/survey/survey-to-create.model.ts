import { QuestionToCreate } from '../question/question-to-create.model';

export interface SurveyToCreate {
    sectionId: string;
    title: string;
    description: string;
    questions: QuestionToCreate[];
}