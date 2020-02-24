import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './MailChimpForm.css';

class MailChimpForm extends Component {
    render() {
        return (
            <div id="mc_embed_signup" className="mx-auto">
                <Form
                    action="https://uci.us16.list-manage.com/subscribe/post?u=5a9c0e84b29c28b9639d34561&amp;id=ad4445a4e5"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate>
                    <div id="mc_embed_signup_scroll">
                        <FormGroup>
                            <Label for="mce-FNAME">First Name </Label>
                            <Input type="text" name="FNAME" id="mce-FNAME" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mce-LNAME">Last Name </Label>
                            <Input type="text" name="LNAME" id="mce-LNAME" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mce-EMAIL">
                                Email Address{' '}
                                <span className="asterisk">*</span>
                            </Label>
                            <Input
                                type="email"
                                name="EMAIL"
                                className="required email"
                                id="mce-EMAIL"
                            />
                        </FormGroup>
                        <div id="mce-responses" className="clear">
                            <div
                                className="response"
                                id="mce-error-response"
                                style={{ display: 'none' }}
                            />
                            <div
                                className="response"
                                id="mce-success-response"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div
                            style={{ position: 'absolute', left: -5000 }}
                            aria-hidden="true">
                            <Input
                                type="text"
                                name="b_5a9c0e84b29c28b9639d34561_ad4445a4e5"
                                tabIndex="-1"
                                defaultValue=""
                            />
                        </div>
                        <div className="clear">
                            <Input
                                type="submit"
                                defaultValue="Subscribe"
                                name="subscribe"
                                id="mc-embedded-subscribe"
                                className="submit-btn"
                            />
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default MailChimpForm;
