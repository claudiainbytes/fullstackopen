import patientsData from './../data/patients';

import { 
          NonSensitivePatientEntry, 
          PatientEntry, 
          NewPatientEntry, 
          NewEntry,
          Entry
        } from '../types';

import utils from '../utils';

const patients: PatientEntry [] = patientsData.map(obj => {
  const object = utils.toNewPatientEntry(obj) as PatientEntry;
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
  const newPatient = {
    id: uuid,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): NewPatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntry = ( entry: NewEntry, idPatient: string, uuid:string ): Entry | string => {
  
  const patient = patients.find(p => p.id === idPatient);
  
  const newEntry: Entry = {
    id: uuid,
    ...entry
  };
  
  if(patient){
    patient.entries?.push(newEntry);
    return newEntry;
  }

  return "Patient not found";
  
};


export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntry
};