import React, { Component } from 'react';
import Navigation from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Banner lead="404: Page Not Found" />
            </div>
        );
    }
}

export default PageNotFound;
