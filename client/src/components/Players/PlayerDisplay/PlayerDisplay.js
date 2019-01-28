import React, { Component } from 'react';
import './PlayerDisplay.css';

class PlayerDisplay extends Component {
    render() {
        return (
            <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
                <div className='player-info'>
                    <h3>{this.props.firstName}</h3>
                    <h2>{this.props.lastName}</h2>
                    <h3 className='position'>{this.props.position}</h3>
                </div>
            </div>
        )
    }
}

export default PlayerDisplay;