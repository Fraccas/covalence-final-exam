import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Welcome to the book store!</h1>
                <img width="100%" height="74%" src="https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg"></img>
                <button type="submit" className="btn btn-primary btn-block" onClick={() => { this.props.history.push('/book/all') }}>
                    View Bookstore
                </button>
            </div>
        );
    }
}

interface HomeState { }
interface HomeProps extends RouteComponentProps { }

export default Home;