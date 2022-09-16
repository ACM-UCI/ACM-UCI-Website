import React from 'react';
import Navigation from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';

export default function PageNotFound() {
    return (
        <div>
            <Navigation />
            <Banner lead="404: Page Not Found" />
        </div>
    );
}
