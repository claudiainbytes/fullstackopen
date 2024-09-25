import diagnosesData from '../data/diagnoses';

import { NonSensitiveDiagnoseEntry, DiagnoseEntry, NewDiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnosesData;

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoseEntry[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin,
  }));
};

const findByCode = (code: string): NewDiagnoseEntry | undefined => {
  const diagnose = diagnoses.find(d => d.code === code);
  return diagnose;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findByCode
};