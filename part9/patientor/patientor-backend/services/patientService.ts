import patientsData from '../data/patients';

import { NonSensitivePatientEntry, PatientEntry , NewPatientEntry } from '../types';

import toNewPatientEntry from '../utils';

const patients: PatientEntry [] = patientsData.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});
  
const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatientEntry, uuid: string ): PatientEntry => {
  const newPatientEntry = {
    id: uuid,
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
};