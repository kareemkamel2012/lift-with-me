import express = require('express');
import authService from '../services/authService';
import { verifyToken } from '../utils/jwt';
import userService from '../services/userService';
const router = express.Router();


/*
    Login

    POST /auth/login

    Request: 
        [important note - only one of username or email is required, noth both]
        {
            username: string,
            email: string,
            password: string
        }

    Response:
        {
            token: string
        }
        This is a JWT, store it to send in future requests
*/
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

/*
    Signup

    This creates a new user and returns a JWT so client can log in as them immediately

    POST /auth/signup

    Request: 
        {
            username: string,
            email: string,
            password: string,
            lastName: string,
            firstName: string
        }

    Response:
        {
            token: string
        }
        This is a JWT, store it to send in future requests
*/
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

/*
    Get current user

    GET /auth/user

    Request must include x-access-token header with JWT
    Sends main info about user associated with token

    Response:
        {
            user: {
                id: number,
                username: string,
                email: string,
                firstName: string,
                lastName: string
            }
        }
*/
router.get('/user', verifyToken, (req: express.Request, res: express.Response) => {
    const user = req.user;
    res.status(200).json({user});
})

/*
    Check if username exists

    GET /auth/usernameExists?username=string

    Response:
        {
            exists: boolean
        }
*/
router.get('/usernameExists', async (req: express.Request, res: express.Response) => {
    const username: string = (typeof req.query.username === 'string') ? req.query.username : '';
    res.json({exists: !!await userService.findByUsername(username)});
})

export default router;