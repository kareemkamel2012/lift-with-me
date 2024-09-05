import { db } from '../database';
import { User } from '../entities/user/user';
import { UserEntity } from '../entities/user/userEntity';

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

    async findById(id: number): Promise<UserEntity | undefined> {
        return new Promise<UserEntity | undefined>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE id = ?`, [id], (err: Error, row: UserEntity | undefined) => {
                if (err) {
                    console.error(`findById: ${err}`);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async findByUsername(username: string): Promise<UserEntity | undefined> {
        return new Promise<UserEntity | undefined>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE username = ?`, [username], (err: Error, row: UserEntity | undefined) => {
                if (err) {
                    console.error(`findByUsername: ${err}`);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return new Promise<UserEntity | undefined>((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], (err: Error, row: UserEntity | undefined) => {
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