import * as express from 'express';
import * as passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';
import { any } from 'prop-types';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: any, res, next) => {
    try {
        console.log("BookStore Attempting Login: " + req.user.email);
        let token = await CreateToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        });
        console.log("Login Success...");
    } catch (e) {
        console.log("Login Failed...")
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;