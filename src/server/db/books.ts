import { pool } from './index';
import { resolve } from 'dns';

export const getBooks = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM books', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getBookById = async (id: string) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const addBook = async (categoryid: string, title: string, author: string, price: number) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO books (categoryid, title, author, price) VALUES (?, ?, ?, ?)', [categoryid, title, author, price], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}



export default {
    getBooks, getBookById, addBook
}