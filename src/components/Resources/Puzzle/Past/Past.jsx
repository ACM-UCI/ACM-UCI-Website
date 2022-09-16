import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import config from '../../../config';
import Quarter from '../Quarter/Quarter';

import './Past.css';

/**
 * The Past component renders the tabbed-panes of all past quarter problem sets.
 * It is rendered right below the Present component.
 * @param {*} props
 */
function Past(props) {
    const { data, week, session } = props; // data is the quarterly problem data used to populate the tab panes
    const { quarters, meetings } = config; // A list in order of all quarters

    // Generate TabPanes: have to do past & current separately because past has default session/week
    //  but current has same session/week as is passed from props
    // Add Past Quarters
    const tabQuarters = [];
    for (let i = 0; i < quarters.length - 1; ++i) {
        const splitQuarter = quarters[i]
            .split(' ')
            .map((s) => s.toLowerCase())
            .join('-');
        tabQuarters.push(
            <Tab key={splitQuarter} eventKey={splitQuarter} title={quarters[i]}>
                <Quarter
                    session={meetings[i].length}
                    week={11}
                    quarter={quarters[i]}
                    quarterIndex={i}
                    data={data}
                />
            </Tab>
        );
    }

    const lastQuarter = quarters[quarters.length - 1];
    const splitQuarter = lastQuarter
        .split(' ')
        .map((s) => s.toLowerCase())
        .join('-');

    // Add Current Quarter
    tabQuarters.push(
        <Tab key={splitQuarter} eventKey={splitQuarter} title={lastQuarter}>
            <Quarter
                session={session}
                week={week}
                quarter={lastQuarter} // last quarter is current
                quarterIndex={quarters.length - 1}
                data={data}
            />
        </Tab>
    );

    return (
        <div>
            <Tabs
                defaultActiveKey={splitQuarter}
                id="quarter-selection-tabs"
                className="justify-content-center"
            >
                {tabQuarters}
            </Tabs>
        </div>
    );
}

Past.propTypes = {
    week: PropTypes.number,
    session: PropTypes.number,
    data: PropTypes.object,
};

export default Past;
