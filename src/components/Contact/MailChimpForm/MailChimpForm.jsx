import React from 'react';
import { Form } from 'react-bootstrap';
import './MailChimpForm.css';

export default function MailChimpForm() {
    return (
        <div id="mc_embed_signup" className="mx-auto">
            <Form
                action="https://uci.us16.list-manage.com/subscribe/post?u=5a9c0e84b29c28b9639d34561&amp;id=ad4445a4e5"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
            >
                <div id="mc_embed_signup_scroll">
                    <Form.Group controlId="mce-FNAME">
                        <Form.Label>First Name </Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="mce-LNAME">
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="mce_EMAIL">
                        <Form.Label>
                            Email Address <span className="asterisk">*</span>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            className="required email"
                            required
                        />
                    </Form.Group>
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
                        aria-hidden="true"
                    >
                        <input
                            type="text"
                            name="b_5a9c0e84b29c28b9639d34561_ad4445a4e5"
                            tabIndex="-1"
                        />
                    </div>
                    <div className="clear mt-3">
                        <input
                            type="submit"
                            value="Subscribe"
                            name="subscribe"
                            id="mc-embedded-subscribe"
                            className="btn submit-btn"
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
}
