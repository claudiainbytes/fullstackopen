import express from 'express';

import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getNonSensitiveEntries());
});
router.get('/:code', (req, res) => {
  const diagnose = diagnoseService.findByCode(String(req.params.code));

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

export default router;