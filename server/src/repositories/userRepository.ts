import { db } from '../database';
import { User } from '../models/user';

class UserRepository {
    async createUser(
        username: string,
        passwordHash: string,
        email: string,
        lastName: string,
        firstName: string
    ): Promise<void> {
        db.run(
            `INSERT INTO users (username, passwordHash, email, lastName, firstName) VALUES (?, ?, ?, ?, ?)`,
            [username, passwordHash, email, lastName, firstName]
        );
    }

    async findById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE id = ?`, [id], (err: Error, row: User) => {
                if (err) {
                    console.error(`findById: ${err}`);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async findByUsername(username: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE username = ?`, [username], (err: Error, row: User) => {
                if (err) {
                    console.error(`findByUsername: ${err}`);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async findByEmail(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], (err: Error, row: User) => {
                if (err) {
                    console.error(`findByEmail: ${err}`);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

export default new UserRepository();