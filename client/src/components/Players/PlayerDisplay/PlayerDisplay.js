import React, { Component } from 'react';
import './PlayerDisplay.css';

class PlayerDisplay extends Component {
    render() {
        return (
            <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5' id='card'>
                <div className='player-info'>
                    <div className='position'>
                        <h6>{this.props.position}</h6>
                    </div>
                    <div className='first-name'>
                        <p>{this.props.firstName}</p>
                    </div>
                    <div className='last-name'>
                        <h4><strong>{this.props.lastName.toUpperCase()}</strong></h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerDisplay;