import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Events from './components/Events/Events';
import Blog from './components/Blog/Blog';
import Resources from './components/Resources/Resources';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import IntroCP from './components/Resources/IntroCP/IntroCP';
import Puzzle from './components/Resources/Puzzle/Puzzle';
import Donate from './components/Donate/donate';
import Login from './components/Login/Login';
import config from './firebase-config.js';
import './scss/custom.css';
import IEEExtreme13 from './components/Blog/BlogPages/IEEExtreme13';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
// Initialize Cloud Firestore through Firebase
firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/events" component={Events} />
                <Route path="/blog/ieeextreme13" component={IEEExtreme13} />
                <Route path="/blog" component={Blog} />
                <Route path="/resources" component={Resources} />
                <Route path="/board" component={Board} />
                <Route path="/donate" component={Donate} />
                <Route path="/contact" component={Contact} />
                <Route path="/introToCp" component={IntroCP} />
                <Route path="/puzzle" component={Puzzle} />
                <Route path="/login" component={Login} />
            </Switch>
        );
    }
}

export default App;
