import React, { Component } from 'react';

import Navigation from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import UploadBlog from './UploadBlog';

import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { Container } from 'reactstrap';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export default class SubmitBlog extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            curTab: 0
        };
    }

    toggle(event, newTab) {
        this.setState({ curTab: newTab });
    }

    componentWillMount() {}

    render() {
        // Extract State
        let { curTab } = this.state;
        return (
            <React.Fragment>
                <Navigation />
                <Banner lead="Blogs" leadSub="History in the Making" />
                <Container>
                    <Paper>
                        <Tabs
                            value={curTab}
                            onChange={this.toggle}
                            indicatorColor="primary"
                            textColor="primary"
                            centered>
                            <Tab label="Create" />
                            <Tab label="Upload" />
                        </Tabs>
                    </Paper>
                    <TabPanel value={curTab} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={curTab} index={1}>
                        <UploadBlog />
                    </TabPanel>
                </Container>
            </React.Fragment>
        );
    }
}
