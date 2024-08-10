import userRepository from '../repositories/userRepository';
import { createToken } from '../utils/jwt';
const bcrypt = require('bcrypt');

class AuthService {

    async login(
        username: string | undefined,
        email: string | undefined,
        password: string
    ): Promise<string | null> {
        let user = undefined;
        if (!username && email) {
            user = await userRepository.findByEmail(email);
        }
        else if (!email && username) {
            user = await userRepository.findByUsername(username);
        }
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            return createToken(user);
        }
        else {
            return null;
        }
    }

    async signUp(
        username: string,   
        email: string,
        password: string,
        lastName: string,
        firstName: string
    ): Promise<string> {
        if (await userRepository.findByUsername(username)) {
            throw new Error('Username already exists');
        }
        await userRepository.createUser(username, password, email, lastName, firstName);
        const newUser = await userRepository.findByUsername(username);
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        return createToken(newUser);
    }
}

export default new AuthService();