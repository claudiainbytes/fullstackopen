
import { NewPatientEntry, Gender, HealthCheckRating, Entry, NewEntry, NewHospitalEntry, NewHealthCheckEntry, NewOccupationalHealthCareEntry, DiagnoseEntry, SickLeave, Discharge } from './types';

const isNumber = (param: unknown): param is string => {
  return typeof param === 'number' || param instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string_: unknown): string => {
  if (!isString(string_)) {
    throw new Error('Incorrect data ' + string_);
  }

  return string_;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect entries: ' + entries);
  }
  return entries as Array<Entry>;
};

const isHealthCheckRating = (param: number): boolean => {
  return param in HealthCheckRating;
};

const parseHealthCheckRating = (healthcheck: unknown): number => {
  if (!isNumber(healthcheck) || !isHealthCheckRating(Number(healthcheck))) {
    throw new Error('Incorrect health check rate: ' + healthcheck);
  }
  return Number(healthcheck);
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {

    const newPatient: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries)
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseDiagnosis = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (typeof object !== 'object' || object === null || !('date' in object && 'criteria' in object)) {
    throw new Error('Incorrect discharge: ' + JSON.stringify(object));
  }
  return object as Discharge;
};

  const parseSickLeave = (object: unknown): SickLeave => {
    if (typeof object !== 'object' || object === null || !('startDate' in object && 'endDate' in object)) {
      throw new Error('Incorrect sick leave: ' + JSON.stringify(object));
    }
    return object as SickLeave;
  };

const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'type' in object && 'description' in object && 'specialist' in object && 'diagnosisCodes' in object) {

    const type: string = parseString(object.type);
  
    switch(type){
      case "Hospital":
        if('discharge' in object){
          const newEntry: NewHospitalEntry = {
            date: parseString(object.date),
            type,
            description: parseString(object.description),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
            discharge: parseDischarge(object.discharge)
          };
          return newEntry;
        }
      break;
      case "OccupationalHealthcare":
        if('employerName' in object && 'sickLeave' in object ){
          const newEntry: NewOccupationalHealthCareEntry = {
            date: parseString(object.date),
            type,
            description: parseString(object.description),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
          return newEntry;
        }
      break;
      case "HealthCheck":
        if('healthCheckRating' in object){
          const newEntry: NewHealthCheckEntry = {
            date: parseString(object.date),
            type,
            description: parseString(object.description),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating) 
          };
          return newEntry;
        }
      break;  
    }

  }

  throw new Error('Incorrect data: a field missing');
};

export default { toNewPatientEntry, toNewEntry };