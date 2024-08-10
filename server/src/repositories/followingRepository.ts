import { db } from '../database';

class FollowingRepository {
    async makeFollow(person1Id: number, person2Id: number): Promise<void> {
        db.run(`INSERT INTO following (person1Id, person2Id) VALUES (?, ?)`, [person1Id, person2Id]);
    }

    async isFollowing(person1Id: number, person2Id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            db.get(`SELECT * FROM following WHERE person1Id = ? AND person2Id = ?`, [person1Id, person2Id], (err: Error, row: any) => {
                if (err) {
                    console.error(`isFollowing: ${err}`);
                    reject(err);
                } else {
                    resolve(row !== undefined);
                }
            });
        });
    }

    async areTheyFriends(person1Id: number, person2Id: number): Promise<boolean> {
        return await this.isFollowing(person1Id, person2Id) && await this.isFollowing(person2Id, person1Id);
    }

    async makeUnfollow(person1Id: number, person2Id: number): Promise<void> {
        db.run(`DELETE FROM following WHERE person1Id = ? AND person2Id = ?`, [person1Id, person2Id]);
    }

    async getFollowerIds(personId: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            db.all(`SELECT person1Id FROM following WHERE person2Id = ?`, [personId], (err: Error, rows: any) => {
                if (err) {
                    console.error(`getFollowers: ${err}`);
                    reject(err);
                } else {
                    resolve(rows.map((row: any) => row.person1Id));
                }
            });
        });
    }

    async getFollowingIds(personId: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            db.all(`SELECT person2Id FROM following WHERE person1Id = ?`, [personId], (err: Error, rows: any) => {
                if (err) {
                    console.error(`getFollowing: ${err}`);
                    reject(err);
                } else {
                    resolve(rows.map((row: any) => row.person2Id));
                }
            });
        });
    }

}

export default new FollowingRepository();