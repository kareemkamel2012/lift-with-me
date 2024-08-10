import { User } from "../models/user";
import userRepository from "../repositories/userRepository";
import bcrypt = require('bcrypt');

class UserService {
    async findById(id: number): Promise<User | null> {
        return await userRepository.findById(id);
    }

    async findByUsername(username: string): Promise<User | null> {
        return await userRepository.findByUsername(username);
    }
    
    async create(
        username: string,
        email: string,
        password: string,
        lastName: string,
        firstName: string
    ): Promise<User | null> {
        const passwordHash = await bcrypt.hash(password, 10);
        await userRepository.createUser(username, passwordHash, email, lastName, firstName);
        return this.findByUsername(username);
    }
}

export default new UserService();