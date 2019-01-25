import React, { Component } from 'react';
import './AccountSettings.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class AccountSettings extends Component {
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

    render() {
        return (
            <div className='account-settings-container'>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} centered>
                    <ModalHeader toggle={this.props.toggle}>Account Settings</ModalHeader>
                    <ModalBody>
                        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                            <main className="pa4 black-80">
                                <form className="measure">
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                        <legend className="f5 fw6 ph0 mh0">Change your username or password.</legend>
                                        <div className="mt3">
                                            <label className="db fw6 lh-copy f6">New Username</label>
                                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                                   type="text" name="username" id="username" onChange={this.onUsernameChange}/>
                                        </div>
                                        <div className="mv3">
                                            <label className="db fw6 lh-copy f6" htmlFor="password">New Password</label>
                                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                                   type="password" name="password" id="password" onChange={this.onPasswordChange}/>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                        <Button color="primary" onClick={this.props.toggle}>Submit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default AccountSettings;