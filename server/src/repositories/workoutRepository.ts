import { db } from "../database";
import { Workout } from "../models/workout";

class WorkoutRepository {
    async getWorkoutsForUser(userId: number): Promise<Workout[]> {
        return new Promise<Workout[]>((resolve, reject) => {
            db.all(`SELECT * FROM workouts WHERE userId = ?`, [userId], (err: Error, rows: any) => {
                if (err) {
                    console.error(`getWorkoutsForUser: ${err}`);
                    reject(err);
                } else {
                    resolve(rows.map((row: any) => row as Workout));
                }
            });
        });
    }

    async insertWorkout(
        name: string | undefined,
        description: string | undefined,
        userId: number,
        date: string,
        rating: number
    ): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            db.run(`INSERT INTO workouts (name, description, userId, date, rating) VALUES (?, ?, ?, ?, ?)`, [
                name,
                description,
                userId,
                date,
                rating
            ], function (err: Error | null, result: { lastID: number }) {
                if (err) {
                    console.error(`insertWorkout: ${err}`);
                    reject(err);
                } else {
                    resolve(result.lastID);
                }
            });
        });
    }

    async updateWorkout(workout: Workout): Promise<void> {
        db.run(
            `UPDATE workouts SET name = ?, description = ?, date = ?, rating = ? WHERE id = ?`,
            [workout.name, workout.description, workout.date, workout.rating, workout.id]
        );
    }
}

export default new WorkoutRepository();