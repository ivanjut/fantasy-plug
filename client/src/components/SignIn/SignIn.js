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
            errors: [],
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
        this.setState({ errors: [] });
        if (this.state.username === "" || this.state.password === "") {
            this.state.errors.push("Username and password cannot be empty.")
        } else {
            axios.post("/api/users/signin/" + bodyContent.username, bodyContent)
                .then(() => {
                    this.setState({ success: "Successfully signed in!" });
                    this.props.onSignIn()
                })
                .catch(err => {
                    console.log(err);
                    this.state.errors.push("Sign in failed!");
                })
        }
    };

    render() {
        return (
            <div className='signin-container'>
                <div className='title'>
                    <h1>Fantasy Plug</h1>
                </div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
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
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                       type="submit" value="Sign In" onClick={this.onSubmitSignIn}/>
                            </div>
                            <div className="lh-copy mt3">
                                {/*<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"*/}
                                       {/*type="submit" value="Sign Up" onClick={this.onSubmitSignUp}/>*/}
                                {/*<a href="#" className="f6 link dim black db">Forgot your password?</a>*/}
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        )
    }
}

export default SignIn;