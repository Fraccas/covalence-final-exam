import { Router } from 'express';

// index route example
// import booksRouter from '/books' 
// router.use('/books', booksRouter);

const router = Router();

// books route example
router.get('/books', async (req, res) => {
    try {
        // database functionality 
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})

export default router;