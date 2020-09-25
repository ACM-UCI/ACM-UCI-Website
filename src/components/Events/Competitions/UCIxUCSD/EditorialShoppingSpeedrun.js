import React from 'react';
import ReactDOM from 'react';
import { Row, Button, Container } from 'reactstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

import pySol from '../../../../data/shopping_cart_speedrun_100_wr.py';
import cppSol from '../../../../data/shopping_cart_speedrun_100_wr.cpp';

export default function EditorialShoppingSpeedrun() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/shopping-100-speedrun-wr"
                className="problem-link">
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-4">Shopping Cart Speedrun 100% WR</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Given a list of <InlineMath math="M" /> pods containing
                    exactly 1 item, figure out the minimum amount of adjacent
                    pods you would have to walk through to collect all items of
                    ids 0 through <InlineMath math="N-1" />.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        1 \le N \le M \le 10^5
                    </BlockMath>
                    <BlockMath className="text-left">0 \le X \le N-1</BlockMath>
                </Container>
            </Container>

            <Container className="text-left">
                <a href="#" className="problem-link" download>
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
                    The first step to solving this problem is understanding what
                    it's asking in the most simple terms possible: find the
                    smallest subarray (group of adjacent elements)with every
                    number from 0 through N-1. If you are familiar with the
                    sliding window algorithm, it should be apparent that this
                    problem is a variant of it.
                </p>
                <p>
                    A quick overview of the sliding window algorithm: maintain
                    two pointers that represent the bounds of a window and
                    within the window keep track of some value. In this case,
                    the value we want to track is the number of unique ids we
                    have within our window. We can do this by using a array to
                    keep track of the counts of each id within the window. When
                    the count of an id increases from 0 to 1, we increment the
                    number of unique items. Likewise, when the count of an id
                    decreases from 1 to 0, we decrement the number of unique
                    items. When the number of unique items is less than{' '}
                    <InlineMath math="N" />, we expand our window right until
                    that condition is met. When the number of unique items
                    equals
                    <InlineMath math="N" />, we can shrink our window from the
                    left until the number of unique items is less than it.
                    During the shrinking phase, our window will have all ids so
                    it is a valid answer and we just have to take the window
                    minimum of the minimum length.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    Our pointers never go backward and through each iteration it
                    is guaranteed that the right pointer will move to the right.
                    Therefore, the overall time complexity is{' '}
                    <InlineMath math="O(N)" />.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
