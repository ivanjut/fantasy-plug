import React, { Component } from 'react';
// import logo from './images/logo.svg';
import './App.css';
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import MyTeam from "./components/MyTeam/MyTeam";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myTeamModal: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = () => {
        this.setState({ myTeamModal: !this.state.myTeamModal });
    };

    render() {
        return (
            <div className="app-container">
                <Nav toggle={this.toggleModal}/>

                <div className='main'>
                    <Main/>
                </div>

                <Footer/>

                <MyTeam isOpen={this.state.myTeamModal} toggle={this.toggleModal}/>

            </div>
        );
    }
}

export default App;
