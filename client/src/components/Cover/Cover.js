import React, { Component } from 'react';
import './Cover.css';
import Particles from "react-particles-js";
import football_player from "../../images/football_player_icon.svg";

const particlesOptions = {
    particles: {
        number: {
            value: 300,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        line_linked: {
            enable_auto: true,
            color: '#4286f4',
        },
        move: {
            enable: true,
            speed: 6,
        },
        shape: {
            type: 'circle',

        },
        size: {
            value: 5,
            random: true,
        },
        color: {
            value: '#4286f4',
        }
    }
};

class Cover extends Component {
    render() {
        return (
            <div className='cover-container'>
                <Particles className='particles' params={particlesOptions} />
                <div className='motto-container'>
                    <h4 className='motto'>Your one stop shop for fantasy football information.</h4>
                </div>
                <div>
                    <img src={football_player} alt='football player' className='football-player'/>
                </div>
            </div>
        )
    }
}

export default Cover;