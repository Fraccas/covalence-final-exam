import { pool } from './index';

export const getBooks = async () => {
    return new Promise((resolve, reject) => {
        pool.query('', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


// db operations


export default {
    getBooks
}