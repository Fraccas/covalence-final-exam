import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api';
import { response } from 'express';

class EditBook extends React.Component<BookProps, BookState> {
    constructor(props: BookProps) {
        super(props);
        this.state = {
            book: {id: '', title: '', price: '', authorid: '', _created: ''},
            id: this.props.match.params.id,
            nTitle: '',
            nPrice: ''
        }
    }

    private saving: boolean = false;

    // get the book data
    async componentDidMount() {
        try {
            let url = '/api/books/' + this.state.id;
            let bookData = await json(url);

            this.setState( {
                book: bookData[0]
            });
        } catch (e) {
            console.log(e);
        }
    }

    render () {
        if (this.state.book && User) {
            return (
                <div className="input-container bg-light m-5 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Edit Book</h2>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text" className="form-control" defaultValue={this.state.book.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({nTitle: e.target.value})}></input>

                        <label htmlFor="book">Book</label>
                        <input type="text" className="form-control" defaultValue={this.state.book.price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({nPrice: e.target.value})}></input>

                        <button className="btn btn-warning ml-0 mt-3" type="submit"
                        onClick={this.UpdateBook}>Update Book</button>

                        <button className="btn btn-danger ml-2 mt-3" type="submit"
                        onClick={this.DeleteBook}>Delete Book</button>

                        <button className="btn btn-secondary ml-2 mt-3" type="submit"
                        onClick={() => {this.props.history.push('/book/all')}}>  Cancel  </button>
                    </div>
                </div>
            );
        } else {
            return (<h1>No books returned.</h1>)
        }
    }

    UpdateBook = async () => {
        if (this.saving) return;

        if (this.state.nTitle) this.state.book.title = this.state.nTitle;
        if (this.state.nPrice) this.state.book.price = this.state.nPrice;

        try {
            this.saving = true;
            let obj = {
                title: this.state.book.title,
                price: this.state.book.price,
                id: this.state.book.id
            }
            let url = '/api/books/' +  this.state.id + '/update';
            let result = await json(url, 'PUT', obj);

            if (result) {
                this.props.history.push('/book/all');
            }
        } catch (e) {
            throw e;
        } finally {
            this.saving = false;
        }
    }

    DeleteBook = () => {
        let url = '/api/books/delete/' + this.state.id;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin' 
        }).then(response => {
            this.props.history.push('/book/all');
        });
    }
}

interface Book {
    id: string, 
    title: string,
    price: string,
    authorid: string,
    _created: string
}

interface BookState {
    book: Book,
    id: string,
    nTitle: string,
    nPrice: string
}
interface BookProps extends RouteComponentProps< {id: string} > {}

export default EditBook;