// for stuff that users post, not for http POST requests!

import express from "express";

const router = express.Router();

/*
    Get post with given id

    FOR NOW all posts are public, no auth required
    public/private posts will be implemented in the future

    GET /post?id=number

    Response:
        {
            id: number,
            userId: number,
            content: string,
            date: string
        }
*/
router.get('/', async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.query.id as string);
    
})

export default router;