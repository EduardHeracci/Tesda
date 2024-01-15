import { Municipality } from "@/municipality/entities/municipality.entity";

export interface LearnerDataRow {
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