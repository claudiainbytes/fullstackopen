import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { calcBmi } from './modules/webBmi';

const app = express();

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
