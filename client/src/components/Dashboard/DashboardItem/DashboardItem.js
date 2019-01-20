import React, { Component } from 'react';
import './DashboardItem.css';

class DashboardItem extends Component {
    render() {
        return (
            <div className='item-container'>
                <this.props.icon className='icon' size='5em'/>
                <div className='text'>
                    <h3 className='title'>{this.props.title}</h3>
                    <p className='descr'>{this.props.descr}</p>
                </div>
            </div>
        )
    }
}

export default DashboardItem;