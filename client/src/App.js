import React, { Component } from 'react';
// import logo from './images/logo.svg';
import './App.css';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import MyTeam from "./components/MyTeam/MyTeam";
import SignIn from "./components/SignIn/SignIn";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myTeamModal: false,
            signedIn: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    onSignIn = () => {
        this.setState({ signedIn: true});
    };

    onSignOut = () => {
        this.setState({ signedIn: false});
    };

    toggleModal = () => {
        this.setState({ myTeamModal: !this.state.myTeamModal });
    };

    render() {
        return (
            <div>
            {this.state.signedIn ?
                <div className="app-container">

                    <Nav toggle={this.toggleModal} onSignOut={this.onSignOut}/>

                    <div className='main'>
                        <Main/>
                    </div>

                    <Footer/>

                    <MyTeam isOpen={this.state.myTeamModal} toggle={this.toggleModal}/>

                </div>
                :

                    <SignIn onSignIn={this.onSignIn}/>
            }
            </div>
        );
    }
}

export default App;
