import { User } from "../models/user/user";
import followingRepository from "../repositories/followingRepository";
import userService from "./userService";

class FollowingService {
    async follow(followerId: number, followedId: number): Promise<void> {
        if (!await followingRepository.isFollowing(followerId, followedId)) {
            await followingRepository.makeFollow(followerId, followedId);
        }
    }

    async unfollow(followerId: number, followedId: number): Promise<void> {
        await followingRepository.makeUnfollow(followerId, followedId);
    }

    async isFollowing(followerId: number, followedId: number): Promise<boolean> {
        return await followingRepository.isFollowing(followerId, followedId);
    }

    async areTheyFriends(followerId: number, followedId: number): Promise<boolean> {
        return await followingRepository.areTheyFriends(followerId, followedId);
    }
    
    async getFollowerIds(followedId: number): Promise<number[]> {
        return await followingRepository.getFollowerIds(followedId);
    }

    async getFollowingIds(followerId: number): Promise<number[]> {
        return await followingRepository.getFollowingIds(followerId);
    }

    async getFriendIds(followerId: number): Promise<number[]> {
        const followingIds = await followingRepository.getFollowingIds(followerId);
        const followerIds = new Set<number>(await followingRepository.getFollowerIds(followerId));
        return followingIds.filter(value => followerIds.has(value));
    }

    async getFollowers(followedId: number): Promise<User[]> {
        const ids = await followingRepository.getFollowerIds(followedId);
        const users = await Promise.all(ids.map(id => userService.findById(id)));
        return users.filter(user => user !== undefined) as User[];
    }

    async getFollowing(followerId: number): Promise<User[]> {
        const ids = await followingRepository.getFollowingIds(followerId);
        const users = await Promise.all(ids.map(id => userService.findById(id)));
        return users.filter(user => user !== undefined) as User[];
    }

    async getFriends(followerId: number): Promise<User[]> {
        const ids = await this.getFriendIds(followerId);
        const users = await Promise.all(ids.map(id => userService.findById(id)));
        return users.filter(user => user !== undefined) as User[];
    }
}

export default new FollowingService();