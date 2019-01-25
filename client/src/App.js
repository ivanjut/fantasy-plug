import React, { Component } from 'react';
// import logo from './images/logo.svg';
import './App.css';
import axios from 'axios';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import MyTeam from "./components/MyTeam/MyTeam";
import SignIn from "./components/SignIn/SignIn";
import AccountSettings from "./components/AccountSettings/AccountSettings";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myTeamModal: false,
            signedIn: false,
            accountSettings: false,
        };
        this.toggleMyTeamModal = this.toggleMyTeamModal.bind(this);
        this.toggleAccountSettings = this.toggleAccountSettings.bind(this);
    }

    onSignIn = () => {
        this.setState({ signedIn: true});
    };

    onSignOut = () => {
        axios.post("/api/users/signout")
            .then(() => {
                this.setState({signedIn: false});
            });
    };

    toggleMyTeamModal = () => {
        this.setState({ myTeamModal: !this.state.myTeamModal });
    };

    toggleAccountSettings = () => {
        this.setState({ accountSettings: !this.state.accountSettings });
    };

    onConfirmDeleteAccount = (event) => {
        event.preventDefault();
        axios.delete("/api/users/")
            .then(() => {
                this.setState( {signedIn: false} );
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div>
            {this.state.signedIn ?
                <div className="app-container">

                    <Nav toggle={this.toggleMyTeamModal} toggleAccountSettings={this.toggleAccountSettings} onSignOut={this.onSignOut}/>

                    <div className='main'>
                        <Main/>
                    </div>

                    <Footer/>

                    <AccountSettings isOpen={this.state.accountSettings} toggle={this.toggleAccountSettings} onConfirmDeleteAccount={this.onConfirmDeleteAccount}/>

                    <MyTeam isOpen={this.state.myTeamModal} toggle={this.toggleMyTeamModal}/>

                </div>
                :
                <div className='signin-component-container'>
                    <SignIn onSignIn={this.onSignIn}/>
                </div>
            }
            </div>
        );
    }
}

export default App;
