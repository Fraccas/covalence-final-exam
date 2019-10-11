import { pool } from './index';

export const getCategories = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM categories', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


// db operations


export default {
    getCategories
}