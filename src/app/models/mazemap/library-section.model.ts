import { Survey } from '../survey/survey.model';

export interface LibrarySection {
    id: number;
    zLevel: number;
    type: number;
    survey: Survey;
    coordinates: Coordinates[];
}
