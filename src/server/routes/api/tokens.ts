import { Router } from 'express';
import db from '../../db';

const router = Router();


// get token data by id/token
router.get('/:id/:token', async (req, res) => {
    try {
        res.json(await db.AccessTokens.getToken(req.params.id, req.params.token));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/add/:userid', async (req, res) => {
    try {
        res.json(await db.AccessTokens.addToken(req.params.userid));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/update/:token/:id', async (req, res) => {
    try {
        res.json(await db.AccessTokens.updateToken(req.params.token, req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


export default router;