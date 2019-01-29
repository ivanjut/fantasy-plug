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
            qbChecked: true,
            rbChecked: true,
            wrChecked: true,
            teChecked: true,
        };
    }

    componentDidMount() {
        axios.get("/api/players/all/").then(res => {
            this.setState({ displayedPlayers: res.data });
        });
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    };

    onPositionFilterChange = (event) => {
        this.setState( {[event.target.name]: event.target.checked} );
    };

    onSelectAll = (event) => {
        this.setState( {qbChecked: true,
                        rbChecked: true,
                        wrChecked: true,
                        teChecked: true } );
    };

    onDeselectAll = (event) => {
        this.setState( {qbChecked: false,
                        rbChecked: false,
                        wrChecked: false,
                        teChecked: false } );
    };

    render() {

        const filteredPlayersSearch = this.state.displayedPlayers.filter(player => {
            return player.firstName.toLowerCase().includes(this.state.searchField.toLowerCase()) ||
                player.lastName.toLowerCase().includes(this.state.searchField.toLowerCase());
        });

        const selectedPositionFilters = [];
        if (this.state.qbChecked) {
            selectedPositionFilters.push('QB');
        }
        if (this.state.rbChecked) {
            selectedPositionFilters.push('RB');
        }
        if (this.state.wrChecked) {
            selectedPositionFilters.push('WR');
        }
        if (this.state.teChecked) {
            selectedPositionFilters.push('TE');
        }

        const filteredPlayersPos = filteredPlayersSearch.filter(player => {
            return selectedPositionFilters.includes(player.pos);
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
                            <h5>Search</h5>
                            <input className="form-control mr-sm-2" type="search" placeholder="search players" aria-label="Search"
                                onChange={this.onSearchChange}/>
                        </div>
                        <div className='pa2'>
                            <h5>Position</h5>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="qbChecked" type="checkbox" id="qb"
                                       value="qb" checked={this.state.qbChecked} onChange={this.onPositionFilterChange}/>
                                    <label className="form-check-label" htmlFor="qb">QB</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="rbChecked" type="checkbox" id="rb"
                                       value="rb" checked={this.state.rbChecked} onChange={this.onPositionFilterChange}/>
                                    <label className="form-check-label" htmlFor="rb">RB</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="wrChecked" type="checkbox" id="wr"
                                       value="wr" checked={this.state.wrChecked} onChange={this.onPositionFilterChange}/>
                                    <label className="form-check-label" htmlFor="wr">WR</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="teChecked" type="checkbox" id="te"
                                       value="te" checked={this.state.teChecked} onChange={this.onPositionFilterChange}/>
                                <label className="form-check-label" htmlFor="te">TE</label>
                            </div>
                            <div className='buttons'>
                                <input className="btn btn-secondary select-all-button"
                                       type="submit" value="Select All" onClick={this.onSelectAll}/>
                                <input className="btn btn-secondary deselect-all-button"
                                       type="submit" value="Deselect All" onClick={this.onDeselectAll}/>
                            </div>
                        </div>
                    </div>
                    <div className='player-container'>
                        {
                            filteredPlayersPos.map((player, i) => {
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