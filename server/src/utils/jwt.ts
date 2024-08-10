import jwt = require('jsonwebtoken');
import { jwtSecret } from "../config";
import { User } from "../models/user";
import express = require('express');

export const createToken = (user: User) => {
    // may need to make user into a "plain object" with stringify -> parse
    return jwt.sign(user, jwtSecret);
}


export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.headers['x-access-token']) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    if (Array.isArray(req.headers['x-access-token']) || !req.headers['x-access-token'].startsWith('Bearer ')) {
        res.status(400).send({ auth: false, message: 'Invalid token format. Use: Bearer <token>' });
    }
    const token = (req.headers['x-access-token'] as string).split(' ')[1];
    console.log(`token: `, token);
    jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
        if (err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    res.status(401).send({ auth: false, message: 'Token expired' });
                    break;
                case 'JsonWebTokenError':
                    res.status(401).send({ auth: false, message: 'Invalid token' });
                    break;
                default:
                    console.log(err);
                    res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            return;
        }
        req.user = decoded;
        console.log(`decoded: `, decoded);
        next();
    });
}