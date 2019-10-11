import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api'; 

class AddBook extends React.Component<BookProps, BookState> {
    constructor(props: BookProps) {
        super(props);
        this.state = {
            bookAuthor: '',
            bookTitle: '',
            bookPrice: '',
            categoryID: '1',
            categories: []
        }
    }

    private saving: boolean = false;

    // grab categories from db
    async componentDidMount() {
        if (!User || User.userid === null) {
            this.props.history.replace('/login');
        } else {
            // logged in, get category options
            try {
                let r = await fetch('/api/categories');
                let cD = await r.json();
                this.setState({categories: cD});
            } catch (error) {
                console.log("CategoriesError: " + error);
            }
        }
    }

    render() {  
        return (
            <div className="input-container bg-light p-2 m-0">
                <div className="form-group m-4 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Add Book</h2>

                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" placeholder='author...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ bookAuthor: e.target.value })}>
                    </input>
                    <hr></hr>

                    <label htmlFor="category-select">Choose category:</label><br></br>
                    <select id="category-select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ categoryID: e.target.value})}>
                        {this.LoopCategories()}
                    </select>
                    <hr></hr>

                    <label htmlFor="book">Book Title</label>
                    <input type="text" className="form-control" placeholder='title...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ bookTitle: e.target.value })}></input>
                    <hr></hr>

                    <label htmlFor="book">Book Price</label>
                    <input type="text" className="form-control" placeholder="write your book price..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ bookPrice: e.target.value })}></input>

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.SubmitBook}>Submit Book</button>
                </div>
            </div>
        );
    }

    LoopCategories = () => {
        return (
        this.state.categories.map((t) => {
            return (<option key={t['name']} value={t['id']}>{t['name']}</option>);
            })
        );
    }

    // send user data to store on the backend
    SubmitBook = async () => {
        if (this.saving) return; // already clicked and processing 

        if (this.state.bookPrice && this.state.bookTitle) {
            try {
                this.saving = true;
                let obj = {
                    categoryid: this.state.categoryID,
                    title: this.state.bookTitle,
                    author: this.state.bookAuthor,
                    price: this.state.bookPrice
                }
                console.log(obj);
                let url = '/api/books/new';
                let result = await json(url, 'POST', obj);

                if (result) {
                    this.setState({bookTitle: '', bookPrice: ''});
                    this.props.history.push('/books/all');
                }
            } catch (e) {
                throw e;
            } finally {
                this.saving = false; // done with request 
            }   
        } else {
            alert('Please enter book info.');
        }
    }
}

export interface BookState {
    bookAuthor: string,
    bookTitle: string,
    bookPrice: string,
    categoryID: string,
    categories: Array<any>
}
export interface BookProps extends RouteComponentProps {}

export default AddBook;