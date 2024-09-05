import * as sqlite3 from 'sqlite3';
const fs = require('fs');

class Database {
    db: sqlite3.Database;
    constructor() {
        const pathToDB = './liftWithMe.db';

        if (!fs.existsSync(pathToDB)) {
            console.error(`Database file doesn't exist - you are probably starting the server from the 
            wrong directory. Start from lift-with-me/server/`);
            process.exit(1);
        }

        this.db = new sqlite3.Database(pathToDB, (err) => {
            if (err) {
                console.error('Could not connect to database', err);
            } else {
                console.log('Connected to database');
            }
        });
        this.initialize();
    }   

    initialize() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                passwordHash TEXT NOT NULL,
                email TEXT NOT NULL,
                lastName TEXT NOT NULL,
                firstName TEXT NOT NULL
            );`);

            // person 1 follows person 2
            // "friends" follow each other
            this.db.run(`CREATE TABLE IF NOT EXISTS following (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                person1Id INTEGER NOT NULL,
                person2Id INTEGER NOT NULL,
                FOREIGN KEY (person1Id) REFERENCES users(id),
                FOREIGN KEY (person2Id) REFERENCES users(id)
            )`);

            // rating should be from 1 to 5
            // could be represented on client as "stars" or something else, easy to change
            this.db.run(`CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                userId INTEGER NOT NULL,
                date TEXT NOT NULL,
                rating INTEGER,
                FOREIGN KEY (userId) REFERENCES users(id)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exercise TEXT,
                reps INTEGER,
                weight INTEGER,
                note TEXT,
                workoutId INTEGER NOT NULL,
                FOREIGN KEY (workoutId) REFERENCES workouts(id)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                userId INTEGER NOT NULL,
                date TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                userId INTEGER NOT NULL,
                postId INTEGER NOT NULL,
                date TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (postId) REFERENCES posts(id)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS likes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                postId INTEGER NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (postId) REFERENCES posts(id)
            )`);
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error closing the database', err);
            } else {
                console.log('Database connection closed');
            }
        });
    }
}

export const db = new Database().db;