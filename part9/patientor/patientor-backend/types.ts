export interface DiagnoseEntry {
    id?: number;
    code: string;
    name: string;
    latin?: string;
}
  
export type NewDiagnoseEntry = Omit<DiagnoseEntry, 'id'>;
  
export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
interface SickLeave {
    startDate: string;
    endDate: string;
}
interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface Discharge {
    date: string;
    criteria: string;
}
interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;
export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries?: Array<Entry>;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
  
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

