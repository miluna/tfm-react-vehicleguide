import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import {isUserAdmin, login, validateEmailAndPassword} from "../services/AuthService";
import {withRouter} from "react-router";
import ErrorMessage from '../models/Error';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            logged: false
        }
    }

    updateEmail = (e) => {
        this.setState({email: e.target.value})
    };

    updatePassword = (e) => {
        this.setState({password: e.target.value})
    };

    sendCredentialsOnKeyPress = (e) => {
        if (e.key === "Enter") this.sendCredentials();
    };

    sendCredentials = () => {
        if (this.validateParameters()) {
            // send credentials
            login(this.state.email, this.state.password)
                .then(result => {
                    console.log(result);
                    if (result) this.setState({logged: true});
                    else this.setState(new ErrorMessage("Email or password incorrect"));
                });
        }
    };

    validateParameters = () => {
        const {email, password} = this.state;

        // validate parameters
        const validOrError = validateEmailAndPassword(email, password);

        if (validOrError instanceof ErrorMessage) {
            this.setState(validOrError);
            return false;
        } else {
            return true;
        }
    };

    componentDidMount() {
        const isAdmin = isUserAdmin();
        if (isAdmin) this.props.history.push("/admin");
    }


    render() {
        // redirect to admin panel after login
        if (this.state.logged) return <Redirect to="/admin"/>;
        else return (
            <div className="container" style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <div className="form card centered" style={{backgroundColor: '#f5f5f5'}}>
                    <h3 className="Subtitle" style={{fontWeight: 600}}>Email</h3>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Insert your email"
                        onChange={this.updateEmail}
                    />
                    <br/>
                    <h3 className="Subtitle" style={{fontWeight: 600}}>Password</h3>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Type your password"
                        onChange={this.updatePassword}
                        onKeyPress={this.sendCredentialsOnKeyPress}
                    />
                    <br/>
                    <span style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" size="medium" text="Sign In" onClick={this.sendCredentials}/>
                    </span>
                    <br/>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);