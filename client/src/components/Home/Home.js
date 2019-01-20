import React, { Component } from 'react';
import './Home.css';
import Cover from "../Cover/Cover";
import Dashboard from "../Dashboard/Dashboard";

class Home extends Component {
    render() {
        return (
            <div>
                <Cover/>
                <Dashboard/>
            </div>
        )
    }
}

export default Home;