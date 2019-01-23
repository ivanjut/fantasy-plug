import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

    render() {
        return (
            <div className='navbar-container'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to='/' className="navbar-brand">FantasyPlug</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/stats' className="nav-link">Stats</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/news' className="nav-link">News</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/players' className="nav-link">Players</Link>
                            </li>
                            <li>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search for player" aria-label="Search"/>
                                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </li>
                        </ul>

                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.props.toggle}>My Team</button>

                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" style={{textAlign: 'center'}}>
                                <a className="dropdown-item" href="#">Account Settings</a>
                                {/*<Link exact to='/' className="nav-link dropdown-item">Account Settings</Link>*/}
                                <div className="dropdown-divider"></div>
                                <button className='btn btn-danger' onClick={this.props.onSignOut}>Sign Out</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;