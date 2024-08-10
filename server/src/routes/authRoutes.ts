import express = require('express');
import authService from '../services/authService';
import { verifyToken } from '../utils/jwt';
import userService from '../services/userService';
const router = express.Router();

router.post('/login', async (req: express.Request, res: express.Response) => {
    const token = await authService.login(
        req.body.username,
        req.body.email,
        req.body.password
    );
    if (!token) {
        res.status(401).json({error: 'Invalid credentials'});
    } else {
        res.json({token});
    }
})

router.post('/signup', async (req: express.Request, res: express.Response) => {    
    try {
        const token = await authService.signUp(
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.lastName,
            req.body.firstName
        );
        if (!token) {
            res.status(401).json({error: 'Invalid credentials'});
        } else {
            res.json({token});
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/user', verifyToken, (req: express.Request, res: express.Response) => {
    const user = req.user;
    res.status(200).json({user});
})

router.get('/usernameExists', async (req: express.Request, res: express.Response) => {
    const username: string = (typeof req.query.username === 'string') ? req.query.username : '';
    res.json({exists: !!await userService.findByUsername(username)});
})

export default router;