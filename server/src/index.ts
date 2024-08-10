import express, { Express, Request, Response } from 'express';
import { db } from './database';
import { PORT } from './config';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  console.log(db);
  
}

startServer();