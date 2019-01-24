import React, { Component } from 'react';
import './MyTeam.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class MyTeam extends Component {
    render() {

        return (
            <div className='modal-container'>
                 <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} centered>
                        <ModalHeader toggle={this.props.toggle}>My Team</ModalHeader>
                        <ModalBody>
                            <p>Organize your team here!</p>
                            <hr/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                            <Button color="primary" onClick={this.props.toggle}>Save</Button>
                        </ModalFooter>
                 </Modal>
            </div>
        );
    }
}

export default MyTeam;