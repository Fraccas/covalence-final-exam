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
router.post('/new', async (req, res) => {
    try {
        res.json(await db.Books.addBook(req.body.categoryid, req.body.title, req.body.author, req.body.price));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// delete book by id
router.delete('/delete/:id', async (req, res) => {
    try {
        res.json(await db.Books.deleteBook(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// update book by id
router.put('/:id/update', async (req, res) => {
    try {
        res.json(await db.Books.updateBook(req.body.title, req.body.price, req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;