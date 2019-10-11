import { Router } from 'express';

import booksRouter from './books';
import categoriesRouter from './categories';
import tokensRouter from './tokens';
import usersRouter from './users';

const router = Router();

router.use('/books', booksRouter);
router.use('/categories', categoriesRouter);
router.use('/tokens', tokensRouter);
router.use('/users', usersRouter);

export default router;