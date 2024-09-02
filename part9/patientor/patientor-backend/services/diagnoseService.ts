import diagnosesData from '../data/diagnoses';

import { NonSensitiveDiagnoseEntry, DiagnoseEntry
//    , NewDiagnoseEntry 
} from '../types';

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
/*
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
*/

export default {
  getEntries,
  //addDiary,
  getNonSensitiveEntries,
  //findById
};