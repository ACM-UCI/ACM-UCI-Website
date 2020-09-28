import React from 'react';
import { Row, Button, Container } from 'reactstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

import pySol from '../../../../data/i_caught_the_bomber.py';
import cppSol from '../../../../data/i_caught_the_bomber.cpp';

export default function EditorialICaughtTheBomber() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/i-caught-the-bomber"
                className="problem-link">
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">I Caught the Bomber</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Given a list of emails and approved schools, print out the
                    emails that do not end with edu or are not in the list of
                    approved schools.
                </p>
                <p>
                    Every email will be in the format "username@school.domain".
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        0 \le N \le 10^6
                    </BlockMath>
                    <BlockMath className="text-left">
                        0 \le M \le 10^5
                    </BlockMath>
                </Container>
            </Container>

            <Container className="text-left">
                <a href={pySol} className="problem-link" download>
                    {' '}
                    {/* This should be the link to download the solution file */}
                    <h2>Solution</h2>
                </a>
                <Row>
                    <a href={pySol} className="mx-1" download>
                        <Button>
                            <i data-feather="download" /> Python Solution
                        </Button>
                    </a>
                    <a href={cppSol} className="mx-1" download>
                        <Button>
                            <i data-feather="download" /> C++ Solution
                        </Button>
                    </a>
                </Row>
                <p>
                    All emails are already valid email addresses, so we don't
                    have to do any checking of that. Because we only care about
                    the school and the top-level domain, we simply just have to
                    look at the string following the @ sign.
                </p>
                <p>
                    This means we just have to check if ending string is a
                    concatenation of an approved school and ".edu"
                </p>
                <p>
                    Since the worst test case can have up to{' '}
                    <InlineMath> 10^5</InlineMath> different schools, we should
                    store all the possible valid endings in a hash set so we can
                    look up if an ending is valid in{' '}
                    <InlineMath>O(1)</InlineMath>.
                </p>
                <p>
                    Now, all we have to do is go through the list of email
                    addresses and check if its ending is in our table, and if it
                    isn't, we print it out.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    The time to go through each school is
                    <InlineMath>O(M)</InlineMath>. The time it takes to go
                    through each email is <InlineMath>O(N)</InlineMath>.
                </p>
                <p>
                    The time it takes to validate an email address is
                    <InlineMath>O(M)</InlineMath> if we iterate through each
                    school to find a match, but it is{' '}
                    <InlineMath>O(1)</InlineMath> if we look it up with a hash
                    table.
                </p>
                <p>
                    So the total time complexity is{' '}
                    <InlineMath>O(M) + O(N) \cdot O(1) = O(M + N)</InlineMath>
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
