import { db } from "../database";
import { ExerciseSet } from "../models/set";

class SetRepository {
    async getSetsForWorkout(workoutId: number): Promise<ExerciseSet[]> {
        return new Promise<ExerciseSet[]>((resolve, reject) => {
            db.all(`SELECT * FROM sets WHERE workoutId = ?`, [workoutId], (err: Error, rows: any) => {
                if (err) {
                    console.error(`getSetsForWorkout: ${err}`);
                    reject(err);
                } else {
                    resolve(rows.map((row: any) => row as ExerciseSet));
                }
            });
        });
    }

    async insertSet(
        exercise: number,
        reps: number,
        weight: number,
        note: string | undefined,
        workoutId: number
    ): Promise<void> {
        db.run(`INSERT INTO sets (exercise, reps, weight, note, workoutId) VALUES (?, ?, ?, ?, ?)`, [
            exercise,
            reps,
            weight,
            note,
            workoutId
        ]);
    }
}

export default new SetRepository();