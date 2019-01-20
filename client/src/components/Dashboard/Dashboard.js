import React, { Component } from 'react';
import './Dashboard.css';
import DashboardItem from "./DashboardItem/DashboardItem";
import { FaChartBar, FaNewspaper, FaFootballBall } from 'react-icons/fa'
import {Link} from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div className='page-container'>
                <div className='dashboard-container'>
                    <Link to='/stats' className="item nav-link">
                        <DashboardItem icon={FaChartBar} title="Stats" descr="Browse through stats and analytics."/>
                    </Link>
                    <Link to='/news' className="item nav-link">
                        <DashboardItem icon={FaNewspaper} title="News" descr="Read up on the latest NFL and fantasy football news."/>
                    </Link>
                    <Link to='/players' className="item nav-link">
                        <DashboardItem icon={FaFootballBall} title="Players" descr="Focus in on NFL player profiles."/>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Dashboard;