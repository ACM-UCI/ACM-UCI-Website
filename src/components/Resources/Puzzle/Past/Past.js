import React, { useState } from 'react';
import PropTypes from 'prop-types';

import config from '../../../config';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Quarter from '../Quarter/Quarter';
import classnames from 'classnames';

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
        tabQuarters.push(
            <TabPane key={`pane-quarter-${i}`} tabId={i}>
                <Quarter
                    session={meetings[i].length}
                    week={11}
                    quarter={quarters[i]}
                    quarterIndex={i}
                    data={data}
                />
            </TabPane>
        );
    }

    // Add Current Quarter
    tabQuarters.push(
        <TabPane
            key={`pane-quarter-${quarters.length - 1}`}
            tabId={quarters.length - 1}>
            <Quarter
                session={session}
                week={week}
                quarter={quarters[quarters.length - 1]} // last quarter is current
                quarterIndex={quarters.length - 1}
                data={data}
            />
        </TabPane>
    );

    const toggle = newTab => {
        if (activeTab !== newTab) setActiveTab(newTab);
    };

    // Initialize State
    const [activeTab, setActiveTab] = useState(quarters.length - 1);

    // Generate Tab NavLinks
    const tabLinks = quarters.map((qtr, i) => {
        return (
            <NavItem key={`nav-quarter-${i}`}>
                <NavLink
                    className={[
                        classnames({ active: activeTab === i }),
                        'tab-link'
                    ].join(' ')}
                    onClick={() => {
                        toggle(i);
                    }}>
                    {qtr}
                </NavLink>
            </NavItem>
        );
    });

    return (
        <div>
            <Nav tabs>{tabLinks}</Nav>

            <TabContent activeTab={activeTab}>{tabQuarters}</TabContent>
        </div>
    );
}

Past.propTypes = {
    week: PropTypes.number,
    session: PropTypes.number,
    data: PropTypes.object
};

export default Past;
