import express = require('express');
import { verifyToken } from '../utils/jwt';
import followingService from '../services/followingService';
const router = express.Router();

/*
    Follow a user. Does nothing if already following

    Request must include x-access-token header with JWT
    JWT should belong to user trying to follow

    POST /following/follow

    Request:
        {
            followingId: number,
            followedId: number
        }

    Response:
        none
*/
router.post('/follow', verifyToken, async (req: express.Request, res: express.Response) => {
    const followerId = parseInt(req.body.followingId);
    const followedId = parseInt(req.body.followedId);
    if (!followerId || !followedId) {
        res.status(400).json({error: 'Missing follower or followed id'});
    } else {
        try {
            await followingService.follow(followerId, followedId);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
});

/*
    Unfollow a user. Does nothing if not following

    Request must include x-access-token header with JWT
    JWT should belong to user trying to unfollow

    POST /following/unfollow

    Request:
        {
            followingId: number,
            followedId: number
        }

    Response:
        none
*/
router.post('/unfollow', verifyToken, async (req: express.Request, res: express.Response) => {
    const followerId = parseInt(req.body.followingId);
    const followedId = parseInt(req.body.followedId);
    if (!followerId || !followedId) {
        res.status(400).json({error: 'Missing follower or followed id'});
    } else {
        try {
            await followingService.unfollow(followerId, followedId);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
});

/*
    Check if user is following another user

    Request must include x-access-token header with JWT

    GET /following/isFollowing?followingId=number&followedId=number

    Response:
        {
            isFollowing: boolean
        }
*/
router.get('/isFollowing', verifyToken, async (req: express.Request, res: express.Response) => {
    const followerId = parseInt(req.query.followingId as string);
    const followedId = parseInt(req.query.followedId as string);
    if (!followerId || !followedId) {
        res.status(400).json({error: 'Missing follower or followed id'});
    } else {
        const isFollowing = await followingService.isFollowing(followerId, followedId);
        res.json({isFollowing});
    }
});

/*
    Check if two users are friends

    Request must include x-access-token header with JWT

    GET /following/isFriend?user1Id=number&user2Id=number

    Response:
        {
            isFriend: boolean
        }  
*/
router.get('/isFriend', verifyToken, async (req: express.Request, res: express.Response) => {
    const user1Id = parseInt(req.query.user1Id as string);
    const user2Id = parseInt(req.query.user2Id as string);
    if (!user1Id || !user2Id) {
        res.status(400).json({error: 'Missing user1 or user2 id'});
    } else {
        const isFriend = await followingService.areTheyFriends(user1Id, user2Id);
        res.json({isFriend});
    }
});


/*
    Get list of accounts following a user

    Request must include x-access-token header with JWT

    GET /following/followers?userId=number

    Response:
        {
            followers: User[]
        }
        see /auth/user for format of User
*/
router.get('/followers', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.query.userId as string);
    console.log(userId);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const followers = await followingService.getFollowers(userId);
        res.json({followers});
    }
})

/*
    Get list of accounts a user is following

    Request must include x-access-token header with JWT

    GET /following/following?userId=number

    Response:
        {
            following: User[]
        }
        see /auth/user for format of User
*/
router.get('/following', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.query.userId as string);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const following = await followingService.getFollowing(userId);
        res.json({following});
    }
})

/*
    Get list of accounts a user is friends with

    Request must include x-access-token header with JWT

    GET /following/friends?userId=number

    Response:
        {
            friends: User[]
        }
        see /auth/user for format of User
*/
router.get('/friends', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.query.userId as string);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const friends = await followingService.getFriends(userId);
        res.json({friends});
    }
})

export default router;

