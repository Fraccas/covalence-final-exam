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


// get all categories
router.get('/', async (req, res) => {
    try {
        res.json(await db.Categories.getCategories());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;