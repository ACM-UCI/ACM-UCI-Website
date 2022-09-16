import React from 'react';
import { Row, Button, Container } from 'react-bootstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

import pySol from '../../../../data/ayrco.py';
import cppSol from '../../../../data/ayrco.cpp';

export default function EditorialAyrco() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/ayrco"
                className="problem-link"
            >
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Ayrco</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Given a list of edges of a connected graph, figure out the
                    minimum number of air conditioning units (ACUs) that need to
                    be placed and the number of ways they can be placed, such
                    that if a node is removed from the graph, all remaining
                    connected components will have at least one air conditioning
                    unit.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        0 \le N, M \le 10^5
                    </BlockMath>
                    <BlockMath className="text-left">0 \le i,j \le N</BlockMath>
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
                    Nobody solved this one, and for good reason; it relied on
                    knowledge of an advanced classical graph algorithm and it
                    was late in the contest, so implementing it within the time
                    limits would have been difficult. However, this problem is
                    actually not that conceptually hard, if you were familiar
                    with the algorithm behind it (which isn't that uncommon),
                    it's easy to spot the solution.
                </p>
                <p>
                    Articulation points is the underlying concept that is core
                    to this problem, and if you have ever learned what these
                    are, it's very easy to see how it relates to this problem.
                    An articulation point is simply a vertex of a connected
                    component that when removed, splits the graph into multiple
                    connected components. Considering our problem is also asking
                    about the effects of removing a node from a graph,
                    articulation points are a promising place to start looking.
                </p>
                <p>
                    The first realization that can be made is that we never want
                    to put an ACU on an articulation point, because it is
                    essentially holding the graph together and, if it were to be
                    removed, not only would the graph be split, but both sides
                    would lose access to it's ACU. You can intuitively think of
                    it as you don't want to overload a node with too much
                    responsiblity.
                </p>
                <p>
                    The second realization that there are certain components
                    attached to articulation points that absolutely need to have
                    their own ACU. This is because if its articulation point
                    were to be removed, it would be completed disconnected from
                    the rest of the graph and would need its own ACU to
                    self-sustain. Notice the keyword, 'its' articulation point,
                    because if it were connected to more than one articulation
                    point it wouldn't need it's own ACU.
                </p>
                <p>
                    With these realizations, we can observe that it is both
                    necessary and sufficient to place an ACU on each component
                    that is connected to only one articulation point. In
                    addition, we can see that on it doesn't matter where we put
                    the ACU within these components, so the number of ways we
                    can arrange the minimum number of ACUs is the product of the
                    sizes of each single articulation point component.
                </p>
                <p>
                    However, there is an edge case where there are no
                    articulation points. In this case, we need exactly 2 ACUs,
                    because the if we only had one, then the node holding that
                    ACU could be removed. As in the general case, it doesn't
                    matter where we put these, so the number of ways we can
                    arrange it is <InlineMath math="N \choose 2" />, which
                    simplifies to <InlineMath math="\frac{N\cdot(N-1)}{2}" />
                </p>
                <p>
                    Putting it all together:
                    <ol>
                        <li>
                            Identify the Articulation Points (Tarjan's
                            Algorithm)
                        </li>
                        <li>
                            DFS on each articulation points neighbor components
                        </li>
                        <li>
                            If no articulation points answer is{' '}
                            <InlineMath math="2, " />
                            <InlineMath math="N \choose 2" />{' '}
                        </li>
                        <li>
                            Else answer is{' '}
                            <InlineMath math="|comp|, \displaystyle\prod_{i=0}^{|comp|-1}comp_i" />{' '}
                        </li>
                    </ol>
                </p>
                <p></p>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    Tarjan's algorithm and the articulation points DFS each look
                    at every node and every edge once, so the total time
                    complexity is <InlineMath math="O(V + E)" />.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
