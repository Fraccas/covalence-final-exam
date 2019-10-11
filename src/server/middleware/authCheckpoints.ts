import * as passport from 'passport';
import { RequestHandler } from 'express-serve-static-core';

// bearer middleware auth
// call this in server api index route for auth (only regristered user can use api)
// import {tokenCheckpoint} from '../../middleware/authCheckpoints' 
// router.use(tokenCheckpoint());
export const tokenCheckpoint: RequestHandler = ((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if (user) req.user = user;
        return next();
    }) (req, res, next);
});


// restricts assess to API calls based on role
// import {isAdmin} from ....
// ex: router.post('/', isAdmin, async(req, res, next) => {
export const isAdmin: RequestHandler = (req: any, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};