import React from 'react';
import {
    Alert,
    Card,
    CardTitle,
    CardBody,
    Row,
    Col,
    Container,
    CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Banner from '../../Banner/Banner';
import Navigation from '../../Navbar/Navbar';

import comp_list from './competition_list.json';

import './EditorialBrowse.css';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type == 'light' ? 200 : 700]
    },
    top: {
        color: '#1a90ff',
        position: 'absolute',
        left: 0
    }
}));

function CircularProgressWithLabel(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box position="relative" display="inline-flex">
                <CircularProgress
                    variant="determinate"
                    className={classes.bottom}
                    value={100}
                    thickness={props.thickness}
                />
                <CircularProgress
                    variant="static"
                    className={classes.top}
                    value={props.value}
                    thickness={props.thickness}
                />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <Typography
                        variant="caption"
                        component="div"
                        color="textSecondary">{`${Math.round(
                        props.value
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
}

function EditorialLink(props) {
    const { name, link, difficulty, points, rate } = props;
    return (
        <Col lg={4} md={4} sm={12} xs={12} className="my-1">
            <Link to={link}>
                <Card className={`editorial-link-card ${difficulty} m`}>
                    <CardBody className="w-75 py-4">
                        <CardTitle className="text-center editorial-title">
                            {name}
                        </CardTitle>
                        <CardText className="text-center editorial-text">
                            <Row className="align-content-center">
                                <Col className="my-auto">
                                    <h5>{`${points} pts`}</h5>
                                </Col>
                                <Col>
                                    <CircularProgressWithLabel
                                        value={rate * 100}
                                        thickness={5}
                                    />
                                    <small>Acc</small>
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>
                </Card>
            </Link>
        </Col>
    );
}

function CompetitionComponent(props) {
    const { name, date, editorials } = props;

    const renderEditorialLinks = editorials.map((ed, index) => {
        return <EditorialLink key={index} {...ed} />;
    });

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <h3 className="display-4">{name}</h3>
            </Row>
            <Row className="justify-content-center">
                <span>{date}</span>
            </Row>

            <Row>{renderEditorialLinks}</Row>
        </Container>
    );
}

function DifficultyLegend(props) {
    return (
        <Row className="center">
            <Alert className="easy m" transition={{ in: true, timeout: 300 }}>
                Easy
            </Alert>
            <Alert className="med m" transition={{ in: true, timeout: 300 }}>
                Medium
            </Alert>
            <Alert className="hard m" transition={{ in: true, timeout: 300 }}>
                Hard
            </Alert>
        </Row>
    );
}

export default function EditorialBrowse() {
    const toRender = comp_list.map((comp, index) => {
        return <CompetitionComponent key={index} {...comp} />;
    });

    return (
        <React.Fragment>
            <Navigation />
            <Banner
                lead="Competition Editorials"
                leadSub="Stuck on a problem? Don't worry, we've got you."
            />

            <DifficultyLegend />

            <Container fluid>{toRender}</Container>
        </React.Fragment>
    );
}
