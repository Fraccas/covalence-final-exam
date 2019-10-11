import { Router } from 'express';
import db from '../../db';
import { RequestHandler } from 'express-serve-static-core';


const router = Router();

const isLogged: RequestHandler = (req: any, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}


// get all tokens
router.get('/', async (req, res) => {
    try {
        res.json(await db.AccessTokens.getTokens());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;