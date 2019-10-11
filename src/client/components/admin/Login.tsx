import * as React from 'react';
import { json, User, SetAccessToken } from '../../utils/api';
import { Link, RouteComponentProps, Route } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

export default class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '', 
            password: '',
            loginError: false
        };
    }

    private alert: JSX.Element = null;
    private loggingIn: boolean = false;

    componentDidMount() {
        // user is logged in so push them to books page
        if (User.userid != null) this.props.history.push('/');
    }

    LoginSubmit = async() => {
        if (this.loggingIn) return; // user has clicked login already

        if (this.state.email && this.state.password) {
            try {
                this.loggingIn = true;
                let result = await json('/auth/login', 'POST', {
                    email: this.state.email,
                    password: this.state.password
                });

                if (result) {
                    SetAccessToken(result.token, { userid: result.userid, role: result.role });

                    try {
                        let path = '/api/users/' + result.userid;
                        let usernameResult = await json(path);

                        localStorage.setItem('username', usernameResult[0]['name']);
                        User.username = usernameResult[0]['name'];
                        localStorage.setItem('email', this.state.email);
                        window.location.reload(); // logged in so refresh to update nav bar
                    } catch (e) {

                    }
                } else {
                    this.setState({loginError: true}); // show login error message
                }
            } catch (e) {
                this.setState({loginError: true}); // show login error message
            }
        }
    }

    render () {
        if (this.state.loginError === true) {
            this.alert = <div className='alert alert-danger p-2 my-4' role='alert'>Invalid Login Info</div>
        }
        return (
            <div className="card m-4 p-3 shadow">
                <h5 className="m-3">Email
                    <input type="text" className="form-control" placeholder='email...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}></input>
                    </h5>

                    <h5 className="m-3">Password
                    <input type="password" className="form-control" placeholder='password...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}></input>
                    </h5>

                    <Link to={'/register'} className="nav-link text-center"> Create New Account </Link>   

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.LoginSubmit}>Login
                    </button>
                    {this.alert}
            </div>
        );
    
    }
}

export interface ILoginProps extends RouteChildrenProps { }

export interface ILoginState {
    email: string, 
    password: string,
    loginError: boolean
}