import { ExerciseSet } from "../models/set";
import setRepository from "../repositories/setRepository";
import workoutRepository from "../repositories/workoutRepository";
import { WithoutId } from "../utils/withoutId";

class WorkoutService {
    async createWorkout(
        userId: number,
        date: string,
        rating: number,
        name?: string,
        description?: string,
        sets: WithoutId<ExerciseSet>[] = []
    ) {
        const workoutId = await workoutRepository.insertWorkout(name, description, userId, date, rating);
        for (const set of sets) {
            setRepository.insertSet(set.exercise, set.reps, set.weight, set.note, workoutId);
        }
    }

    async createSet(
        exercise: string,
        reps: number,
        weight: number,
        note: string | undefined,
        workoutId: number
    ) {
        await setRepository.insertSet(exercise, reps, weight, note, workoutId);
    }
}

export default new WorkoutService();