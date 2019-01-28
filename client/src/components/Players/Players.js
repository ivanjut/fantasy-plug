import React, { Component } from 'react';
import './Players.css';
import PlayerDisplay from "./PlayerDisplay/PlayerDisplay";
import axios from 'axios';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPlayers: [],
            searchField: "",
        };
    }

    componentDidMount() {
        axios.get("/api/players/all/").then(res => {
            console.log(res.data);
            this.setState({ displayedPlayers: res.data });
        });
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    };

    render() {

        const filteredPlayers = this.state.displayedPlayers.filter(player =>{
            return player.firstName.toLowerCase().includes(this.state.searchField.toLowerCase()) ||
                player.lastName.toLowerCase().includes(this.state.searchField.toLowerCase());
        });

        return (
            <div className="jumbotron">
                <h1 className="display-4">Players</h1>
                <p className="lead">A list of all the players in the Fantasy Plug database. Browse through players by applying filters.</p>
                <hr className="my-4"/>
                <div className='page-content-container'>
                    <div className='filter-container'>
                        <h3 style={{margin: '5%'}}>Filters</h3>
                        <hr className="my-4"/>
                        <div className='pa2'>
                            <input className="form-control mr-sm-2" type="search" placeholder="search players" aria-label="Search"
                                onChange={this.onSearchChange}/>
                        </div>
                    </div>
                    <div className='player-container'>
                        {
                            filteredPlayers.map((player, i) => {
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