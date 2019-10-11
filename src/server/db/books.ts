import { pool } from './index';

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

export const deleteBook = async(id: number) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const updateBook = async(title: string, price: number, id: number) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE books SET title = ?, price = ? WHERE id = ?', [title, price, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


export default {
    getBooks, getBookById, addBook,
    deleteBook, updateBook
}