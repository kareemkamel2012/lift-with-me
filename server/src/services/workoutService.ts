import { ExerciseSet } from "../models/set";
import { WorkoutEntity } from "../models/workout/workoutEntity";
import { WorkoutModel } from "../models/workout/workoutModel";
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
        for (const set of sets) {
            console.log(set.exercise, set.reps, set.weight, set.note);
        }
        const workoutId = await workoutRepository.insertWorkout(name, description, userId, date, rating);
        for (const set of sets) {
            setRepository.insertSet(set.exercise, set.reps, set.weight, set.note, workoutId);
        }
    }

    async getWorkoutsForUser(userId: number): Promise<WorkoutModel[]> {
        const workoutEntities = await workoutRepository.getWorkoutsForUser(userId);
        return Promise.all(workoutEntities.map(async workoutEntity => {
            const sets = await setRepository.getSetsForWorkout(workoutEntity.id);
            return this.createWorkoutModel(workoutEntity, sets);
        }));
    }

    private createWorkoutModel(workoutEntity: WorkoutEntity, sets: ExerciseSet[]): WorkoutModel {
        return {
            id: workoutEntity.id,
            name: workoutEntity.name,
            description: workoutEntity.description,
            userId: workoutEntity.userId,
            date: new Date(workoutEntity.date),
            rating: workoutEntity.rating,
            sets: sets,
        }
    }
}

export default new WorkoutService();