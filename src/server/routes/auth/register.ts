import * as express from 'express';
import DB from '../../db';

import { HashPass } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        console.log("Bookstore Registering new user: " + user.name);
        user.password = HashPass(req.body.password);
        let result: any = await DB.Users.createUser(user.name, user.email, user.password);
        let token = await CreateToken({ userid: result.insertId });
        res.json({
            token, 
            role: 'guest',
            userid: result.insertId
        });
        console.log(user.name + " has been added as a new user!");
    } catch (e) {
        console.log(e);
        res.sendStatus(500); 
    }
});

export default router;