import express from 'express';

import patientService from '../services/patientService';

import { NewEntry, Entry } from '../types';

import utils from '../utils';

import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry, uuid());
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries/', (req, res) => {

  const idPatient:string = String(req.params.id);

  try {
    
    const newEntry: NewEntry = utils.toNewEntry(req.body);
    const addedEntry: Entry | string = patientService.addEntry(newEntry, idPatient, uuid());
    if(typeof addedEntry === "string"){
      res.status(401).send(addedEntry); 
    } else {
      res.status(200).send(addedEntry); 
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

  
});

export default router;