import { db } from '../database';

class PostRepository {
    async insertPost(
        content: string,
        date: string,
        userId: number,
        workoutId?: number,
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.run(`INSERT INTO posts (content, userId, workoutId, date) VALUES (?, ?, ?, ?)`, [
                content,
                userId,
                workoutId,
                date
            ], function (err: Error | null) {
                if (err) {
                    console.error(`insertPost: ${err}`);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getPostsForWorkout(workoutId: number): Promise<PostEntity[]> {
        return new Promise<PostEntity[]>((resolve, reject) => {
            db.all(`SELECT * FROM posts WHERE workoutId = ?`, [workoutId], (err: Error, rows: any) => {
                if (err) {
                    console.error(`getPostsForWorkout: ${err}`);
                    reject(err);
                } else {
                    resolve(rows.map((row: any) => row as PostEntity));
                }
            });
        });
    }
}
