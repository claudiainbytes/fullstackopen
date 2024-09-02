export interface DiagnoseEntry {
    id?: number;
    code: string;
    name: string;
    latin?: string;
}
  
export type NewDiagnoseEntry = Omit<DiagnoseEntry, 'id'>;
  
export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export interface PatientEntry {
    id?: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
  
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
