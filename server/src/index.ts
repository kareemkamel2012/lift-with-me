import express, { Express, Request, Response } from 'express';
import { db } from './database';
import { PORT } from './config';
import authRoutes from './routes/authRoutes';
import followingRoutes from './routes/followingRoutes';
import workoutRoutes from './routes/workoutRoutes';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/follow', followingRoutes);
app.use('/workouts', workoutRoutes);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  console.log(db);
  
}

startServer();