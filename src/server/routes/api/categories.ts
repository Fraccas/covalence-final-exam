import { Router } from 'express';
import db from '../../db';

const router = Router();


// get all categories
router.get('/', async (req, res) => {
    try {
        res.json(await db.Categories.getCategories());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// get one category by id
router.get('/:id', async (req, res) => {
    try {
        res.json(await db.Categories.getCategoryById(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;