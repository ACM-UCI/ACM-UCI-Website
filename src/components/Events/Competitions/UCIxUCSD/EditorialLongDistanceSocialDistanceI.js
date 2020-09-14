import React from 'react';
import { Row, Button, Container } from 'reactstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

// Import Solution Files
import pySol from '../../../../data/long_distance_social_distance_i.py';
import cppSol from '../../../../data/long_distance_social_distance_i.cpp';
import javaSol from '../../../../data/long_distance_social_distance_i.java';

export default function EditorialTemplate() {
    return (
        <Container className="mx-auto text-center py-5">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/long-distance-social-distance-pt-1"
                className="problem-link"
                target="_blank"
                rel="noopener noreferrer">
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Long Distance Social Distance I</h1>
            </a>

            <br />
            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Find the maximum capacity of a spaceship while abiding by a
                    set of rules.
                </p>
                <p>
                    The space craft has <InlineMath>N</InlineMath> rows, each
                    with <InlineMath>6</InlineMath> seats separated in the
                    middle by an aisle.
                </p>
                <p>
                    Passengers cannot be seated directly in front, behind, to
                    the left, or to the right of each other.
                </p>
                <p>
                    It is acceptable to seat passengers directly across the
                    aisle from each other.
                </p>
                <p>
                    You must solve this problem for <InlineMath>T</InlineMath>{' '}
                    test cases
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        0 \le T \le 10^5
                    </BlockMath>
                    <BlockMath className="text-left">
                        0 \le N \le 10^6
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
                    <a href={javaSol} className="mx-1" download>
                        <Button>
                            <i data-feather="download" /> Java Solution
                        </Button>
                    </a>
                </Row>

                <p>
                    This is a relatively trivial problem. It is intuitively
                    obvious that the maximum capacity can be achieved by seating
                    in alternating rows of <InlineMath>4</InlineMath> and{' '}
                    <InlineMath>2</InlineMath>. This is shown below where{' '}
                    <InlineMath>X</InlineMath> represents a taken seat,{' '}
                    <InlineMath>O</InlineMath> represents an empty seat, and{' '}
                    <InlineMath>\_</InlineMath> represents the aisle.
                </p>

                <BlockMath>X O X \_ X O X</BlockMath>
                <BlockMath>O X O \_ O X O</BlockMath>
                <BlockMath>X O X \_ X O X</BlockMath>
                <BlockMath>O X O \_ O X O</BlockMath>
                <BlockMath>X O X \_ X O X</BlockMath>

                <p>
                    A naive solution would attempt to calculate the maximum
                    capacity by iterating through each row, determining the
                    parity of the row, and accordingly updating the total
                    capacity of the spaceship. This, however, is too slow for
                    there can be up to <InlineMath>10^5</InlineMath> testcases,
                    each of which may have <InlineMath>N=10^6</InlineMath> rows.
                    This ends up requiring <InlineMath>{'10^{11}'}</InlineMath>{' '}
                    iterations which will result in a TLE.
                </p>

                <p>
                    A much better solution would be to calculate each test case
                    in <InlineMath>O(1)</InlineMath> time. This can be done in a
                    variety of ways. The key is to recognize that there are two
                    main cases: even and odd parity rows. Assuming 1-based
                    indexing, all odd indexed rows can seat 4 passengers and all
                    even indexed rows can seat 2 passengers. The number of odd
                    indexed rows will always be{' '}
                    <InlineMath>{'ceil(\\frac {N}{2})'}</InlineMath> and the
                    number of even indexed rows will always be{' '}
                    <InlineMath>{'floor(\\frac {N}{2})'}</InlineMath>. Knowing
                    this, the maximum capacity will be:
                </p>
                <BlockMath>
                    {'4*ceil(\\frac{N}{2}) + 2*floor(\\frac{N}{2})'}
                </BlockMath>

                <p>
                    It can also be solved with modular arithmetic but you have
                    to be careful it is{' '}
                    <InlineMath>{'6*floor(\\frac{N}{2})'}</InlineMath> and not{' '}
                    <InlineMath>3N</InlineMath>
                </p>
                <BlockMath>{'6*floor(\\frac{N}{2}) + 4*(N mod 2)'}</BlockMath>

                <p>
                    And for those who want to show off you can do bitwise
                    operations
                </p>
                <BlockMath>{'6*(N>>1) + 4*(N \\& 1)'}</BlockMath>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    The solution which passes all test cases for this problem
                    solves each of the <InlineMath>T</InlineMath> testcases in{' '}
                    <InlineMath>O(1)</InlineMath>. Thus, the entire solution is{' '}
                    <InlineMath>O(T)</InlineMath>
                </p>
                <h4>Beyond the Problem</h4>
                <p>
                    While this problem is indeed trivial, there is actually a
                    lot that can be learned from it.
                </p>
                <p>
                    The first step to rephrase the problem into more general
                    terms. This problem can actually be viewed as a{' '}
                    <a
                        className="body-link"
                        href="https://mathworld.wolfram.com/Graph.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        Graph
                    </a>{' '}
                    problem. In fact, it is a very specific type of graph: it is
                    a{' '}
                    <a
                        className="body-link"
                        href="https://mathworld.wolfram.com/LatticeGraph.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        Lattice Graph
                    </a>
                    .
                </p>
                <p>
                    Once you recognize this is a graph problem, you can identify
                    that it is actually a very important graph problem in the
                    realm of Computer Science:{' '}
                    <a
                        className="body-link"
                        href="https://mathworld.wolfram.com/MaximumIndependentVertexSet.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        The Maximium Independent Vertex Set
                    </a>
                    .
                </p>
                <p>
                    On general graphs, the Maximum Independent Set problem is a{' '}
                    <a
                        className="body-link"
                        href="https://en.wikipedia.org/wiki/NP-completeness"
                        target="_blank"
                        rel="noopener noreferrer">
                        NP Complete
                    </a>{' '}
                    problem. NP is a classification of decision based problems
                    which are only known to be solvable in polynomial time by a{' '}
                    <a
                        className="body-link"
                        href="https://en.wikipedia.org/wiki/Nondeterministic_Turing_machine"
                        target="_blank"
                        rel="noopener noreferrer">
                        non-deterministic Turing Machine
                    </a>{' '}
                    in "non-deterministic polynomial time" - hence the name
                    "NP". The "Complete" aspect refers to subclass of NP
                    problems which are considered NP-hard.
                </p>
                <p>
                    You are welcome to go down the P vs. NP rabit-hole, however,
                    for this problem, and several other types of graphs, the
                    maximum independent vertex set can be found in polynomial
                    time. Questions about the cardinality of the maximum
                    independent vertex sets do occur regularly in competitive
                    programming so it is a good topic to understand.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
