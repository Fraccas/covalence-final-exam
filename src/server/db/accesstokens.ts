import { pool } from './index';

export const getTokens = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tokens', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


// db operations


export default {
    getTokens
}