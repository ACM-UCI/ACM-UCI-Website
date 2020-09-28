import React from 'react';

import { useParams, Redirect } from 'react-router-dom';
import Navigation from '../../Navbar/Navbar';
import Banner from '../../Banner/Banner';

import EditorialICaughtTheBomber from './UCIxUCSD/EditorialICaughtTheBomber';
import EditorialLongDistanceSocialDistanceI from './UCIxUCSD/EditorialLongDistanceSocialDistanceI';
import EditorialDeadlineDash from './UCIxUCSD/EditorialDeadlineDash';
import EditorialShoppingSpeedrun from './UCIxUCSD/EditorialShoppingSpeedrun';
import EditorialToiletPaperTravesty from './UCIxUCSD/EditorialToiletPaperTravesty';
import EditorialLongDistanceSocialDistanceII from './UCIxUCSD/EditorialLongDistanceSocialDistanceII';
import EditorialAyrco from './UCIxUCSD/EditorialAyrco';
import EditorialMansion from './UCIxUCSD/EditorialMansion';

export default function EditorialRoute() {
    let { id } = useParams();
    id = parseInt(id);

    if (isNaN(id)) {
        return <Redirect to="/404" />;
    }

    const mappings = new Map();
    mappings.set(0, <EditorialICaughtTheBomber />);
    mappings.set(1, <EditorialLongDistanceSocialDistanceI />);
    mappings.set(2, <EditorialDeadlineDash />);
    mappings.set(3, <EditorialShoppingSpeedrun />);
    mappings.set(4, <EditorialToiletPaperTravesty />);
    mappings.set(5, <EditorialLongDistanceSocialDistanceII />);
    mappings.set(6, <EditorialAyrco />);
    mappings.set(7, <EditorialMansion />);

    if (!mappings.has(id)) {
        return <Redirect to="/404" />;
    }

    const toRender = mappings.get(id);

    return (
        <React.Fragment>
            <Navigation />
            <Banner lead="Editorial" leadSub="Here's how we did it" />
            {toRender}
        </React.Fragment>
    );
}
