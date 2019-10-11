import { pool } from './index';

export const getUsers = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


// db operations


export default {
    getUsers
}