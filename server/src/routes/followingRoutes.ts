import express = require('express');
import { verifyToken } from '../utils/jwt';
import followingService from '../services/followingService';
import userService from '../services/userService';
const router = express.Router();

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

router.get('/following', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.query.userId as string);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const following = await followingService.getFollowing(userId);
        res.json({following});
    }
})

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

