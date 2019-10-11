import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/public/Home';
import AddBook from './components/public/AddBook';
import ViewBook from './components/public/ViewBook';
import ViewBooks from './components/public/ViewBooks';
import EditBook from './components/public/EditBook';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import { User } from './utils/api'; 

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
                    {this.showAdmin()}   
                    {this.showLog()}                                 
                </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/book/add' component={AddBook} />
                    <Route exact path='/book/view/:id' component={ViewBook} />
                    <Route exact path='/book/all' component={ViewBooks} />
                    <Route exact path='/book/update/:id' component={EditBook} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </div>      
            </Router>   
        )
    }

    showAdmin = () => {
        // let any logged user add books for now
        if (User.role) return (<li><Link to={'/book/add'} className="nav-link"> Add Book </Link></li>);
    }

    showLog = () => {
        if (User.userid == null) 
            return (<li><Link to={'/login'} className="nav-link"> Login </Link></li>);
        else {
            return (<button className="btn" type="submit"
            onClick={this.logout}>Logout</button>);
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }
}

export default App;