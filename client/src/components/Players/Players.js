import React, { Component } from 'react';
import './Players.css';
import PlayerDisplay from "./PlayerDisplay/PlayerDisplay";

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPlayers: [],
        };
    }

    // on mount populate displayedPlayers


    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Players</h1>
                <p className="lead">A list of all the players in the Fantasy Plug database. Browse through players by applying filters.</p>
                <hr className="my-4"/>
                <div className='page-content-container'>
                    <div className='filter-container'>

                    </div>
                    <div className='player-container'>
                        {
                            this.state.displayedPlayers.map((player, i) => {
                                return (
                                    <PlayerDisplay key={i}
                                        firstName={player.firstName}
                                        lastName={player.lastName}
                                        position={player.position}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <hr className="my-4"/>
            </div>
        )
    }
}

export default Players;