import express from "express";
import workoutService from "../services/workoutService";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

router.post('/workouts', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = req.body.userId;
    if (!userId) {
        res.status(400).json({error: 'Missing userId'});
    }
    const name = req.body.name;
    const description = req.body.description;
    const date = req.body.date;
    const rating = req.body.rating;
    if (!name || !date) {
        res.status(400).json({error: 'Missing name or date'});
    }
    const sets = [];
    for (const set of req.body.sets) {
        sets.push({
            exercise: set.exercise,
            weight: set.weight,
            reps: set.reps,
            note: set.note
        });
    }
    await workoutService.createWorkout(userId, date, rating, name, description);
})