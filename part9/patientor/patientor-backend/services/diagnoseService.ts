import diagnosesData from '../data/diagnoses';

import { NonSensitiveDiagnoseEntry, DiagnoseEntry } from '../types';

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

export default {
  getEntries,
  getNonSensitiveEntries
};