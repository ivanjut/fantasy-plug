import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Stats from '../Stats/Stats';
import News from '../News/News';
import Players from '../Players/Players';

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/stats' component={Stats}/>
                    <Route path='/news' component={News}/>
                    <Route path='/players' component={Players}/>
                </Switch>
            </main>
        )
    }
}

export default Main;