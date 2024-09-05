import express from "express";
import workoutService from "../services/workoutService";
import { verifyToken } from "../utils/jwt";
import { WithoutId } from "../utils/withoutId";
import { ExerciseSet } from "../models/set";

const router = express.Router();

/*
    Create a new workout

    Request must include x-access-token header with JWT
    JWT should belong to user creating the workout

    POST /workouts/workout

    Request:
        {
            userId: number,
            [optional] name: string,
            [optional] description: string,
            date: string,
            rating: number,
            sets: {
                exercise: string,
                weight: number,
                reps: number,
                [optional] note: string
            }[]
        }

    Response:
        none
*/
router.post('/workout', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.body.userId);
    if (!userId) {
        res.status(400).json({error: 'Missing userId'});
    }
    const name = req.body.name;
    const description = req.body.description;
    const date = req.body.date;
    const rating = parseInt(req.body.rating);
    if (!name || !date) {
        res.status(400).json({error: 'Missing name or date'});
    }
    const sets = [];
    for (const set of req.body.sets) {
        sets.push({
            exercise: set.exercise,
            weight: parseInt(set.weight),
            reps: parseInt(set.reps),
            note: set.note
        });
    }
    await workoutService.createWorkout(userId, date, rating, name, description, sets as WithoutId<ExerciseSet>[]);
    res.sendStatus(200);
});

/*
    Get list of user's workouts

    Request must include x-access-token header with JWT

    GET /workouts/workouts?userId=number

    Response:
        {
            userId: number,
            [optional] name: string,
            [optional] description: string,
            date: string,
            rating: number,
            sets: {
                exercise: string,
                weight: number,
                reps: number,
                [optional] note: string
            }[]
        }[]
*/
router.get('/workouts', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.query.userId as string);
    if (!userId) {
        res.status(400).json({error: 'Missing userId'});
    }
    const workouts = await workoutService.getWorkoutsForUser(userId);
    res.json({workouts});
});

export default router;