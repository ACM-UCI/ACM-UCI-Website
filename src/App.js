import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Events from './components/Events/Events';
import Resources from './components/Resources/Resources';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import IntroCP from './components/Resources/IntroCP/IntroCP';
import Puzzle from './components/Resources/Puzzle/Puzzle';
import Donate from './components/Donate/donate';
import Login from './components/Login/Login';
import firebase from 'firebase/app';
import './scss/custom.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        var config = {
            apiKey: 'AIzaSyCREpANPjLytuJteEai3xUzu-dkWg69FSg',
            authDomain: 'acm-uci-website.firebaseapp.com',
            databaseURL: 'https://acm-uci-website.firebaseio.com',
            projectId: 'acm-uci-website',
            storageBucket: 'acm-uci-website.appspot.com',
            messagingSenderId: '894657849706'
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/events" component={Events} />
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
