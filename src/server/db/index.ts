import * as mysql from 'mysql';
import config from '../config';

import Books from './books';
import Categories from './categories';
import AccessTokens from './accesstokens';
import Users from './users';

export const pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
}

export default {
    Books, Categories, AccessTokens, Users
}