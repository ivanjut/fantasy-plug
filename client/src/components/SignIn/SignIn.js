import React, { Component } from 'react';
import './SignIn.css';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            success: "",
            error: "",
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    };

    onSubmitSignIn = (event) => {
        event.preventDefault();
        const bodyContent = { username: this.state.username, password: this.state.password };
        this.setState({ success: "",
                        error: "" });
        if (this.state.username === "" || this.state.password === "") {
            this.setState({ error: "Username and password cannot be empty." });
        } else {
            axios.post("/api/users/signin/" + bodyContent.username, bodyContent)
                .then(() => {
                    this.setState({ success: "Successfully signed in!" });
                    this.props.onSignIn()
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: "Sign in failed." });
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';                })
                .finally(() => {
                    this.clearMessages();
                    this.resetForm();
                })
        }
    };

    resetForm = () => {
        this.setState( {username: ""} );
        this.setState( {password: ""} );
    };

    clearMessages = function() {
        setInterval(() => {
            this.setState( {error: ""} );
            this.setState( {success: ""} );
        }, 5000);
    };

    onSubmitSignUp = (event) => {
        event.preventDefault();
        const bodyContent = { username: this.state.username, password: this.state.password };
        this.setState({ error: "" });
        if (this.state.username === "" || this.state.password === "") {
            this.setState({ error: "Username and password cannot be empty." });
        } else {
            axios.post("/api/users/signup/", bodyContent)
                .then(() => {
                    this.setState({ success: "Successfully created account!" });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: "Username already exists." });

                })
                .finally(() => {
                    this.clearMessages();
                    this.resetForm();
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                })
        }
    };

    render() {
        return (
            <div className='signin-container'>
                <div className='signin-widget'>
                    <div className='title'>
                        <h1>Fantasy Plug</h1>
                    </div>
                    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                        <main className="pa4 black-80">
                            <form className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f3 fw6 ph0 mh0">Welcome to the Fantasy Plug!</legend>
                                    <legend className="f6 fw6 ph0 mh0">Sign in or create a new account.</legend>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6">Username</label>
                                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                               type="text" name="username" id="username" onChange={this.onUsernameChange}/>
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                               type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                                    </div>
                                    {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>*/}
                                </fieldset>
                                <div className='buttons'>
                                        <input className="btn btn-primary signin-button"
                                               type="submit" value="Sign In" onClick={this.onSubmitSignIn}/>
                                        <input className="btn btn-outline-primary signup-button"
                                               type="submit" value="Register" onClick={this.onSubmitSignUp}/>
                                </div>
                                {/*<div className="lh-copy mt3">*/}
                                    {/*<a href="#" className="f6 link dim black db">Forgot your password?</a>*/}
                                {/*</div>*/}
                            </form>

                            <div className='messages'>
                                { this.state.success ?
                                    <div className='success-message'>
                                        <p>{this.state.success}</p>
                                    </div>
                                :
                                <p/> }
                                { this.state.error ?
                                    <div className='error-message'>
                                        <p>{this.state.error}</p>
                                    </div>
                                    :
                                    <p/> }
                            </div>

                        </main>
                    </article>
                </div>
            </div>
        )
    }
}

export default SignIn;