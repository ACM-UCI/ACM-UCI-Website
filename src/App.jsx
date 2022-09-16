import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import IntroCP from './components/Resources/IntroCP/IntroCP';
import Puzzle from './components/Resources/Puzzle/Puzzle';
import PageNotFound from './PageNotFound';
import './scss/custom.css';

// const firebase = require('firebase');
// firebase.initializeApp(config);

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/events" element={<Events />} />
            <Route path="/editorials" element={<EditorialBrowse />} />
            <Route
                path="/editorials/:id"
                element={EditorialRoute}
            />
            <Route exact path="/blog" element={Blog} />
            <Route exact path="/blog/submit" element={SubmitBlog} />
            <Route path="/blog/:title" element={BlogPage} />
            <Route path="/resources" element={Resources} /> */}
            <Route path="/board" element={<Board />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/introToCp" element={<IntroCP />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
