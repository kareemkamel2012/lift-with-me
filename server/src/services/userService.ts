import { User } from "../entities/user/user";
import { UserEntity } from "../entities/user/userEntity";
import userRepository from "../repositories/userRepository";
import bcrypt = require('bcrypt');

class UserService {
    toUser(userEntity: UserEntity | undefined): User | undefined {
        if (!userEntity) {
            return undefined;
        }
        return {
            id: userEntity.id,
            username: userEntity.username,
            email: userEntity.email,
            lastName: userEntity.lastName,
            firstName: userEntity.firstName
        }
    }
    async findById(id: number): Promise<User | undefined> {
        return await userRepository.findById(id);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.toUser(await userRepository.findByUsername(username));
    }
    
    async create(
        username: string,
        email: string,
        password: string,
        lastName: string,
        firstName: string
    ): Promise<User | undefined> {
        const passwordHash = await bcrypt.hash(password, 10);
        await userRepository.createUser(username, passwordHash, email, lastName, firstName);
        return this.findByUsername(username);
    }
}

export default new UserService();