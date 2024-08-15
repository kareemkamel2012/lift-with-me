import jwt = require('jsonwebtoken');
import { jwtSecret } from "../config";
import { User } from "../models/user";
import express = require('express');
import userService from '../services/userService';

export const createToken = (userId: number) => {
    return jwt.sign(userId.toString(), jwtSecret);
}

export const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.headers['x-access-token']) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    if (Array.isArray(req.headers['x-access-token']) || !req.headers['x-access-token'].startsWith('Bearer ')) {
        res.status(400).send({ auth: false, message: 'Invalid token format. Use: Bearer <token>' });
    }
    const token = (req.headers['x-access-token'] as string).split(' ')[1];
    console.log(`token: `, token);
    jwt.verify(token, jwtSecret, async (err: any, decoded: any) => {
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
        req.user = await userService.findById(parseInt(decoded));
        if (!req.user) {
            res.status(401).send({ auth: false, message: 'User not found' });
            return;
        }
        next();
    });
}