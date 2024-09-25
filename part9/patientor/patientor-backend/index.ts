import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import pingRouter from './routes/ping';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/ping', pingRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});