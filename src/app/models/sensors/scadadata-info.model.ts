import { ScadadataScores } from '../sensors/Scadadata-scores.model';

export interface ScadadataInfo {
    status: string;
    details: ScadadataScores[];
}