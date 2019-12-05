import { Survey } from '../survey/survey.model';

export interface Section {
    id: string;
    locationId: string;
    zLevel: number;
    type: number;
    survey: Survey;
    coordinates: Coordinates[];
}
