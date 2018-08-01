import React, { Component } from 'react';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Resources from './components/Resources/Resources';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import { Route, Switch } from 'react-router-dom';
import './scss/custom.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/events' component={Events} />
          <Route path='/resources' component={Resources} />
          <Route path='/board' component={Board} />
          <Route path='/contact' component={Contact} />
        </Switch>
    );
  }
}

export default App;
