import { ScadadataScores } from '../sensors/scadadata-scores.model';

export interface ScadadataInfo {
    status: string;
    details: ScadadataScores[];
}