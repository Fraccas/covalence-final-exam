import { pool } from './index';

export const getCategories = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM categories', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getCategoryById = async (id: number) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


export default {
    getCategories, getCategoryById
}