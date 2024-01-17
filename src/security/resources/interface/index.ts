import { LearningOutcome } from "@/learning-outcome/entities/learning-outcome.entity";
import { Municipality } from "@/municipality/entities/municipality.entity";

export interface LearnerInfoDataRow {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    birthDate: Date;
    gender: string;
    phoneNumber: string;
    address: string;
    municipality: Municipality
}

export interface LearningOutcomeDataRow {
    name: string
    taskRequired: string
}

export interface UnitCompetencyDataRow {
    name: string
    unitCompetencyCode: string
    learningOutcome: LearningOutcome
}