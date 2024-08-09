import { log } from 'console';
import express, { Express, Request, Response } from 'express';
import { db } from './database';

const app: Express = express();
const port = 2024;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  console.log(db);
  
}

startServer();