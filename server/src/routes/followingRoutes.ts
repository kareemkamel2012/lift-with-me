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
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
});

router.get('/isFollowing', verifyToken, async (req: express.Request, res: express.Response) => {
    const followerId = parseInt(req.body.followingId);
    const followedId = parseInt(req.body.followedId);
    if (!followerId || !followedId) {
        res.status(400).json({error: 'Missing follower or followed id'});
    } else {
        const isFollowing = await followingService.isFollowing(followerId, followedId);
        res.json({isFollowing});
    }
});

router.get('/isFriend', verifyToken, async (req: express.Request, res: express.Response) => {
    const user1Id = parseInt(req.body.user1Id);
    const user2Id = parseInt(req.body.user2Id);
    if (!user1Id || !user2Id) {
        res.status(400).json({error: 'Missing user1 or user2 id'});
    } else {
        const isFriend = await followingService.areTheyFriends(user1Id, user2Id);
        res.json({isFriend});
    }
});

router.get('/followers', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.body.userId);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const followers = await followingService.getFollowers(userId);
        res.json({followers});
    }
})

router.get('/following', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.body.userId);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const following = await followingService.getFollowing(userId);
        res.json({following});
    }
})

router.get('/friends', verifyToken, async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.body.userId);
    if (!userId) {
        res.status(400).json({error: 'Missing followed id'});
    } else {
        const friends = await followingService.getFriends(userId);
        res.json({friends});
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
