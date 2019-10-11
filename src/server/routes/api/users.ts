import { Router } from 'express';
import db from '../../db';

const router = Router();

// get user by id
router.get('/:id', async (req, res) => {
    try {
        res.json(await db.Users.getUserById(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// create new user
router.post('/new', async (req, res) => {
    try {
        res.json(await db.Users.createUser(req.body.name, req.body.email, req.body.password));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;