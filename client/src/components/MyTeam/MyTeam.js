import React, { Component } from 'react';
import './MyTeam.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import Chip from '@material-ui/core/Chip';

class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
        };
    };

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    };

    handleDeletePlayer = (player) => {

    };

    render() {
        return (
            <div className='modal-container'>
                 <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} centered>
                        <ModalHeader toggle={this.props.toggle}>My Team</ModalHeader>
                        <ModalBody>
                            <p>Organize your team here!</p>
                            <hr/>
                            <input className="form-control mr-sm-2" type="search" placeholder="search players" aria-label="Search"
                                   onChange={this.onSearchChange}/>
                            <div className='my-team-container'>
                                <div className='position-container'>
                                    <h5><strong>QB</strong></h5>
                                    <div className='team-qbs player-chips'>
                                        <Chip   label="Deletable Primary Chip"
                                                onDelete={this.handleDeletePlayer}
                                                className='deletable-chip'
                                                color="primary"/>
                                        <Chip   label="Another Test"
                                                onDelete={this.handleDeletePlayer}
                                                className='deletable-chip'
                                                color="primary"/>
                                        <Chip   label="Saquon Barkley"
                                                onDelete={this.handleDeletePlayer}
                                                className='deletable-chip'
                                                color="primary"/>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                        </ModalFooter>
                 </Modal>
            </div>
        );
    }
}

export default MyTeam;