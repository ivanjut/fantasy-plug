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
            teamFilter: "None",
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
        event.preventDefault();
        this.setState( {qbChecked: true,
                        rbChecked: true,
                        wrChecked: true,
                        teChecked: true } );
    };

    onDeselectAll = (event) => {
        event.preventDefault();
        this.setState( {qbChecked: false,
                        rbChecked: false,
                        wrChecked: false,
                        teChecked: false } );
    };

    onTeamFilterSelect = (event) => {
        event.preventDefault();
        this.setState({teamFilter: event.target.value});
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

        let filteredPlayersTeam = filteredPlayersPos;
        if (this.state.teamFilter !== "None") {
            filteredPlayersTeam = filteredPlayersPos.filter(player => {
                return player.team === this.state.teamFilter;
            });
        }

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
                                <input className="btn btn-sm btn-secondary select-all-button"
                                       type="submit" value="Select All" onClick={this.onSelectAll}/>
                                <input className="btn btn-sm btn-secondary deselect-all-button"
                                       type="submit" value="Deselect All" onClick={this.onDeselectAll}/>
                            </div>
                        </div>

                        <div className='pa2'>
                            <h5>Team</h5>
                            <div className="form-group">
                                <select className="form-control" id="team-filter" value={this.state.teamFilter}
                                        onChange={this.onTeamFilterSelect}>
                                    <option value="None">No Filter</option>
                                    <option value="ARI">Arizona Cardinals (ARI)</option>
                                    <option value="ATL">Atlanta Falcons (ATL)</option>
                                    <option value="BAL">Baltimore Ravens (BAL)</option>
                                    <option value="BUF">Buffalo Bills (BUF)</option>
                                    <option value="CAR">Carolina Panthers (CAR)</option>
                                    <option value="CHI">Chicago Bears (CHI)</option>
                                    <option value="CIN">Cincinnati Bengals (CIN)</option>
                                    <option value="CLE">Cleveland Browns (CLE)</option>
                                    <option value="DAL">Dallas Cowboys (DAL)</option>
                                    <option value="DEN">Denver Broncos (DEN)</option>
                                    <option value="DET">Detroit Lions (DET)</option>
                                    <option value="GNB">Green Bay Packers (GNB)</option>
                                    <option value="HOU">Houston Texans (HOU)</option>
                                    <option value="IND">Indianapolis Colts (IND)</option>
                                    <option value="JAX">Jacksonville Jaguars (JAX)</option>
                                    <option value="KAN">Kansas City Chiefs (KAN)</option>
                                    <option value="LAC">Los Angeles Chargers (LAC)</option>
                                    <option value="LAR">Los Angeles Rams (LAR)</option>
                                    <option value="MIA">Miami Dolphins (MIA)</option>
                                    <option value="MIN">Minnesota Vikings (MIN)</option>
                                    <option value="NOR">New Orleans Saints (NOR)</option>
                                    <option value="NWE">New England Patriots (NWE)</option>
                                    <option value="NYG">New York Giants (NYG)</option>
                                    <option value="NYJ">New York Jets (NYJ)</option>
                                    <option value="OAK">Oakland Raiders (OAK)</option>
                                    <option value="PHI">Philadelphia Eagles (PHI)</option>
                                    <option value="PIT">Pittsburgh Steelers (PIT)</option>
                                    <option value="SEA">Seattle Seahawks (SEA)</option>
                                    <option value="SFO">San Francisco 49ers (SFO)</option>
                                    <option value="TAM">Tampa Bay Buccaneers (TAM)</option>
                                    <option value="TEN">Tennessee Titans (TEN)</option>
                                    <option value="WAS">Washington Redskins (WAS)</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className='player-container'>
                        {
                            filteredPlayersTeam.map((player, i) => {
                                return (
                                    <PlayerDisplay key={i}
                                                   firstName={player.firstName}
                                                   lastName={player.lastName}
                                                   position={player.pos}
                                                   team={player.team}

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