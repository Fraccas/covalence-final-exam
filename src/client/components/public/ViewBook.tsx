import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {json, User } from '../../utils/api';

class ViewBook extends React.Component<BookProps, BookState> {
    constructor(props: BookProps) {
        super(props);
        this.state = {
            book: { id: '', categoryid: '', title: '', price: '', userid: '', _created: ''},
            id: this.props.match.params.id,
            user: this.props.match.params.user,
            category: 'empty'
        }
    }

    async componentDidMount() {
        try {
            let url = '/api/books/' + this.state.id; 
            let bookData = await json(url); // using json api auth from utils
            this.setState({
                book: bookData[0],
            });

            // grab category from book
            let res = await json('/api/categories/' + this.state.book.categoryid);
            this.setState({category: res[0]['name']});
        } catch (e) {
            console.log(e);
        }
    }

    render () {
        if (this.state.book) {
            return (
                <div className="input-container bg-light m-5 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Book</h2>
                    <div className="form-group">
                        <h2>{this.state.book.title}</h2>
                        <span className="badge badge-warning">{this.state.category}</span>

                        <hr></hr>
                        <h2>Price: ${this.state.book.price}</h2>
                        <hr></hr>

                        <h5>{this.state.user}</h5>
                        <h5>{this.state.book._created.slice(0, 10)}</h5>

                        {this.showUpdate()}
                        
                        <button className="btn btn-secondary ml-2 mt-3" type="submit"
                        onClick={() => {this.props.history.push('/book/all')}}>  Back  </button>
                    </div>
                </div>
            );
        } else {
            return (<h1>No chirps returned. Invalid ID.</h1>)
        }
    }

    showUpdate = () => {
        // allow any logged user to edit book for now
        if (User.role) return (<button className="btn btn-warning ml-2 mt-3" type="submit"
        onClick={() => {this.props.history.push('/book/update/' + this.state.id)}}>  Edit Book  </button>);
    }
}

interface Book {
    id: string, 
    categoryid: string,
    title: string,
    price: string,
    userid: string,
    _created: string
}

interface BookState {
    book: Book,
    id: string,
    user: string,
    category: string
}
interface BookProps extends RouteComponentProps<{ id: string, user: string}> {

}

export default ViewBook;