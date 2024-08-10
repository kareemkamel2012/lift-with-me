import { User } from "../models/user";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}