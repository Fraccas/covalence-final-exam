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


// get all books
router.get('/', async (req, res) => {
    try {
        res.json(await db.Books.getBooks());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// get book by id
router.get('/:id', async (req, res) => {
    try {
        res.json(await db.Books.getBookById(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

// add new book
router.post('/new', isLogged, async (req, res) => {
    
});


export default router;