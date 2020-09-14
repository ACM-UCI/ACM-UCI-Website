import React from 'react';
import { Card, CardTitle, CardBody, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import Banner from '../../Banner/Banner';
import Navigation from '../../Navbar/Navbar';

import comp_list from './competition_list.json';

function EditorialLink(props) {
    const { name, link } = props;
    return (
        <Link to={link}>
            <Card>
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                </CardBody>
            </Card>
        </Link>
    );
}

function CompetitionComponent(props) {
    const { name, date, editorials } = props;

    const renderEditorialLinks = editorials.map((ed, index) => {
        return <EditorialLink key={index} name={ed.name} link={ed.link} />;
    });

    return (
        <Container>
            <Row>
                <h3>{name}</h3>
                <span>{date}</span>
            </Row>
            <Row>{renderEditorialLinks}</Row>
        </Container>
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

            <Container fluid>{toRender}</Container>
        </React.Fragment>
    );
}
