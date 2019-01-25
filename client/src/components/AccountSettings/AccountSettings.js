import React, { Component } from 'react';
import './AccountSettings.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import axios from "axios";

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            success: "",
            error: "",
            deleteToggle: false,
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    };

    onSubmitUsernameChange = (event) => {
        event.preventDefault();
        const bodyContent = { username: this.state.username, password: this.state.password };
        if (this.state.username === "") {
            this.setState({ error: "No changes were made." });
        } else {
            axios.put("/api/users/" + bodyContent.username, bodyContent)
                .then(() => {
                    this.setState( {success: "Successfully changed username!"} )
                })
                .catch(err => {
                    console.log(err);
                    this.setState( {error: "Username already exists."} );
                })
                .finally(() => {
                    this.clearMessages();
                    this.setState( {username: ""} );
                    document.getElementById('username').value = '';
                })
        }
    };

    onSubmitPasswordChange = (event) => {
        event.preventDefault();
        const bodyContent = { username: this.state.username, password: this.state.password };
        if (this.state.password === "") {
            this.setState({ error: "No changes were made." });
        } else {
            axios.put("/api/users/", bodyContent)
                .then(() => {
                    this.setState( {success: "Successfully changed password!"} )
                })
                .catch(err => {
                    console.log(err);
                    this.setState( {error: "Could not change password."} );
                })
                .finally(() => {
                    this.clearMessages();
                    this.setState( {password: ""} );
                    document.getElementById('password').value = '';
                })
        }
    };

    clearMessages = function() {
        setInterval(() => {
            this.setState( {error: ""} );
            this.setState( {success: ""} );
        }, 5000);
    };

    onSubmitDeleteAccount = (event) => {
        event.preventDefault();
        this.setState( {deleteToggle: !this.state.deleteToggle} );
    };

    render() {
        return (
            <div className='account-settings-container'>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} centered>
                    <ModalHeader toggle={this.props.toggle}>Account Settings</ModalHeader>
                    <ModalBody>
                        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                            <main className="pa4 black-80">
                                <form className="measure">
                                    <fieldset id="change-credentials" className="ba b--transparent ph0 mh0">
                                        <legend className="f3 fw6 ph0 mh0">Credentials</legend>
                                        <legend className="f6 fw6 ph0 mh0">Change your username or password.</legend>
                                        <div className="mt3">
                                            <label className="db fw6 lh-copy f6">New Username</label>
                                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                                   type="text" name="username" id="username" onChange={this.onUsernameChange}/>
                                            <div className='button'>
                                                <Button className='change-button' color="primary" onClick={this.onSubmitUsernameChange}>Change Username</Button>
                                            </div>
                                        </div>
                                        <div className="mv3">
                                            <label className="db fw6 lh-copy f6" htmlFor="password">New Password</label>
                                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                                   type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                                            <div className='button'>
                                                <Button className='change-button' color="primary" onClick={this.onSubmitPasswordChange}>Change Password</Button>
                                            </div>
                                        </div>
                                    </fieldset>
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

                        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                            <main className="pa4 black-80">
                                <form className="measure">
                                    <fieldset id="delete-account" className="ba b--transparent ph0 mh0">
                                        <legend className="f3 fw6 ph0 mh0">Delete Account</legend>
                                        <legend className="f6 fw6 ph0 mh0">Delete your account.</legend>
                                        <div className='button'>
                                            <Button className='delete-button' color="danger" onClick={this.onSubmitDeleteAccount}>Delete Account</Button>
                                        </div>

                                        {this.state.deleteToggle ?
                                            <div className='delete-toggle-div'>
                                                <legend className="f6 fw6 ph0 mh0">
                                                    Are you sure you want to delete your account? This action cannot be undone.
                                                </legend>
                                                <div className='delete-buttons'>
                                                    <Button color="danger" onClick={this.props.onConfirmDeleteAccount}>Delete</Button>
                                                    <Button color="secondary" onClick={this.onSubmitDeleteAccount}>Cancel</Button>
                                                </div>
                                            </div>

                                            :

                                            <p/>
                                        }
                                    </fieldset>
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

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default AccountSettings;