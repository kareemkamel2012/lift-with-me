import { User } from "../models/user/user";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}