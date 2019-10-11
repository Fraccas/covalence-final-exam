import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/public/Home';

class App extends React.Component {


    render() {
        return (
            <Router>
                <div className="nav-container router">
                    <nav className="navbar navbar-expand-sm navbar-light bg-warning font-weight-bold">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link"> Home </Link></li>
                        </ul>
                        <ul className="navbar-nav navbar-right">
                            <li><Link to={'/book/all'} className="nav-link"> Bookstore </Link></li>
                        </ul>
                    </nav>

                    <Switch>
                        <Router exact path="/" component={Home} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;