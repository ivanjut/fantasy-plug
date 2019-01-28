import React, { Component } from 'react';
import './Players.css';
import PlayerDisplay from "./PlayerDisplay/PlayerDisplay";
import axios from 'axios';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPlayers: [],
        };
    }

    // on mount populate displayedPlayers
    componentDidMount() {
        axios.get("/api/players/all/").then(res => {
            console.log(res.data);
            this.setState({ displayedPlayers: res.data });
        });
    }

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
                                        position={player.pos}
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