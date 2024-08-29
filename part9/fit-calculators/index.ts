/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { calcBmi } from './modules/webBmi';
import { isNotArrayOfNumbers, calculateExercises } from './modules/webCalculator';

const app = express();
 
app.use(cors());
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req: Request, res: Response, next: NextFunction) => {
    try {
        if ((!_req.query.height) || (!_req.query.weight)) {
          throw new Error('malformatted parameters');
        }
        const weight:number = Number(_req.query.weight);
        const height:number = Number(_req.query.height);
        res.send(calcBmi(weight, height));
    } catch (error: unknown) {
        next(error);
    }
});

 
app.post('/exercises', (_req: Request, res: Response, next: NextFunction)  => {
    console.log("req body", _req.body);
    try {
      if ((!_req.body.daily_exercises) || (!_req.body.target) || isNotArrayOfNumbers(_req.body.daily_exercises)) {
        throw new Error('malformatted parameters');
      } 
      console.log("typeof target:", typeof _req.body.target, "daily exerc", typeof _req.body.daily_exercises);
      const target:number = Number(_req.body.target);
      const daily_exercises:number[] = _req.body.daily_exercises;

      res.send(calculateExercises(target, daily_exercises));
    } catch (error: unknown) {
        next(error);
    }

});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, next: NextFunction): void => {
    console.error(err.message);

    res.status(500).json({
      error: true,
      message: err.message,
      status: 500
    });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
