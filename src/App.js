import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Events from './components/Events/Events';
import EditorialBrowse from './components/Events/Competitions/EditorialBrowse';
import EditorialRoute from './components/Events/Competitions/EditorialRoute';
import Blog from './components/Blog/Blog';
import BlogPage from './components/Blog/BlogPage';
import SubmitBlog from './components/Blog/SubmitBlog';
import Resources from './components/Resources/Resources';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import IntroCP from './components/Resources/IntroCP/IntroCP';
import Puzzle from './components/Resources/Puzzle/Puzzle';
import Donate from './components/Donate/donate';
import Login from './components/Login/Login';
import PageNotFound from './PageNotFound';
import './scss/custom.css';

// const firebase = require('firebase');
// firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/events" component={Events} />
                <Route exact path="/editorials" component={EditorialBrowse} />
                <Route
                    exact
                    path="/editorials/:id"
                    component={EditorialRoute}
                />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/blog/submit" component={SubmitBlog} />
                <Route path="/blog/:title" component={BlogPage} />
                <Route path="/resources" component={Resources} />
                <Route path="/board" component={Board} />
                <Route path="/donate" component={Donate} />
                <Route path="/contact" component={Contact} />
                <Route path="/introToCp" component={IntroCP} />
                <Route path="/puzzle" component={Puzzle} />
                <Route path="/login" component={Login} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }
}

export default App;
