import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { json } from '../../utils/api'

class ViewBook extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            bookA: [],
            refresh: ''
        }
    }

    async componentDidMount() {
        let bookData = await json('/api/books');
        this.setState({bookA: bookData});

        // convert date
        for (let book of this.state.bookA) {
            book._created = book._created.slice(0,10);
        }
        this.setState({refresh: 'go'}); // force rerender for date format
    }

    render() {
        return ( // render all books
            <div className='container d-flex flex-wrap'>  
                <div className='row w-100 justify-content-center'>
                    {this.state.bookA.map((book, index) => {                      
                        if (book.title) return (
                            <div key={'book-' + index} className="card shadow m-4 p-0 col-md-3">
                                <div className="card-header"><h5 className="card-title bg-grey">{book.title}</h5></div>
                                <div className="card-body">
                                    <h5 className="card-text">{book.author}</h5>
                                    <h5 className="card-text">{book._created}</h5>
                                    <hr></hr>
                                    <button type="submit" className="btn btn-secondary" onClick={() => { this.props.history.push('/book/view/'+book.id) }}>
                                        View Book
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

interface BookPreview {
    id: string, 
    title: string, 
    author: string,
    _created: string
}

export interface IAppState {
    bookA: Array<BookPreview>;
    refresh: string;
}
export interface IAppProps extends RouteComponentProps {}

export default ViewBook;