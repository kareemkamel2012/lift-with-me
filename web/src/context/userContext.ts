import { createContext, Dispatch } from 'react';
import { User } from '../types/user';

interface UserContextValue {
    user: User | null,
    setUser: Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: () => {}
});