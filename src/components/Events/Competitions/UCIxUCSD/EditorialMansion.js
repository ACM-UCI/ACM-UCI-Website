import React from 'react';
import { Row, Button, Container } from 'react-bootstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

import pySol from '../../../../data/mansion.py';
import cppSol from '../../../../data/mansion.cpp';

export default function EditorialMansion() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/toilet-paper-display"
                className="problem-link"
            >
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Mansion!</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Given an original arrangement of packages in rooms and a
                    final arrangement of packages in rooms, find the minimum
                    cost to move the packages from the original to the final
                    arrangements, where <InlineMath math="C \cdot |i-j|" /> is
                    the cost to move a package from{' '}
                    <InlineMath math="\text{room }i\text{ room }j" />, and{' '}
                    <InlineMath math="A\text{ and }B" /> are the costs to add
                    and remove packages respectively.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        0 \le N \le 10^5
                    </BlockMath>
                    <BlockMath className="text-left">
                        0 \le A, B \le 10^8
                    </BlockMath>
                    <BlockMath className="text-left">
                        0 \le C \le 10^3
                    </BlockMath>
                    <BlockMath className="text-left">
                        0 \le X_i,Y_i \le 10
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
                    Yeah, we were pretty sure that no one was going to solve
                    this one during the contest. Not only was it the last
                    problem in the contest, but it's also ridiculously difficult
                    for a local competition like ours. This comes from a &nbsp;
                    <a
                        href="http://www.usaco.org/index.php?page=viewproblem2&cpid=650"
                        className="link"
                    >
                        USACO Platinum problem
                    </a>
                    &nbsp; and while the problem statement is relatively simple,
                    the actual solution is complicated with layers of problem
                    decomposition. I solved it in a greedy way, which is much
                    simpler than the &nbsp;
                    <a
                        href="http://www.usaco.org/current/data/sol_landscape_platinum_open16.html"
                        className="link"
                    >
                        official solution
                    </a>
                    &nbsp; which runs in <InlineMath math="O(N)" /> as opposed
                    to <InlineMath math="O(NlogN)" />.
                </p>
                <p>
                    The first realization you can make is that this problem can
                    be decomposed into the classical dynamic programming problem
                    string edit distance. Represent first column{' '}
                    <InlineMath math="X" /> and the second column{' '}
                    <InlineMath math="Y" />
                    as expanded strings <InlineMath math="x \text{ and } y" />,
                    where <InlineMath math="X_i" /> gets split up into{' '}
                    <InlineMath math="X_i" /> elements in the expanded string{' '}
                    <InlineMath math="x" /> with values <InlineMath math="i" />{' '}
                    and the same applies to <InlineMath math="Y" />.
                </p>
                <p>
                    so if{' '}
                    <InlineMath math="X = [1, 2, 3, 4], Y = [4, 3, 2, 0]" />{' '}
                    then
                </p>
                <p>
                    the resulting strings are{' '}
                    <InlineMath math='x = "0112223333", Y = "000011122"' />
                </p>
                <p>
                    {' '}
                    The length of these strings will be{' '}
                    <InlineMath
                        math="O(NK)
                    \text{ where } K \text{ is the average value of } X_i \text { and } Y_i"
                    />{' '}
                    and since the runtime of string edit is quadratic, the
                    overall time complexity of this algorithm is{' '}
                    <InlineMath
                        math="O((NK)^2) \text{ which is
                    far too large to pass } N = 10^5."
                    />
                </p>
                <p>
                    So, I thought that solution was really cool, but apparently
                    we have to be a lot cooler to solve this problem. Another
                    observation you can make is that you might be able to
                    convert the two columns into a single array containing the
                    difference between the two, such that{' '}
                    <InlineMath
                        math="D_i
                    = X_i - Y_i"
                    />
                    . Now, each element represents either a source or
                    destination of packages.
                </p>
                <p>
                    This problem now can be reduced to a matching problem, where
                    the goal is to find an optimal pairing between package
                    sources and destinations. The next step is a little
                    complicated in it's implementation, so for brevity I won't
                    go over the fine-grain specifics of it's implementation.
                </p>
                <p>
                    The cost of matching the current package with a previous
                    package (one is a source and one is a destination) is the
                    cost of matching it with the current package minus overall
                    cost of matching the previous package to its previous match.
                    <BlockMath
                        math="\text{For example let's say you were
                    matching index }i\text{ with some index }j\text{ and
                    }j\text{ was matched with some index }k"
                    />
                    <BlockMath math="unmatch_{j-k} = overall\_cost_{j-k}" />
                    <BlockMath math="match_{i-j} = C \cdot (i-j)" />
                    <BlockMath math="overall\_cost_{i-j} = C \cdot (i-j) - overall\_cost_{j-k}" />
                    With this, the greedy algorithm simply attempts to match the
                    current package with the most cost-effective matching
                    previous package, using two priority queues (one for source
                    and one for destination). This only fails if the overall
                    cost of unmatching and matching is equal to or exceeds the
                    cost of buying a package for{' '}
                    <InlineMath
                        math="A \text{ or throwing away a package
                    for }B."
                    />{' '}
                    How do you store the cost of matching and unmatching in
                    <InlineMath
                        math="\text{ the priority queue? Well let's say you are at index }j\text{ which just matched with
                    }k\text{, and you want to prepare to match with some }"
                    />{' '}
                    <InlineMath
                        math="\text{future index }i,\text{you know that you will have
                    }C\text{ and }i\text{, so all you need to store is }C \cdot -i -overall\_cost"
                    />
                    .
                    <BlockMath math="overall\_cost_{i-j} = C \cdot i + (C\cdot-j - overall\_cost_{j-k})" />
                    <BlockMath math="overall\_cost_{i-j} = C \cdot (i-j) - overall\_cost_{j-k}" />
                </p>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    The time complexity of my solution is{' '}
                    <InlineMath math="O((NK)log(NK))" />, because of the usage
                    of the priority queue. The{' '}
                    <a
                        href="http://www.usaco.org/current/data/sol_landscape_platinum_open16.html"
                        className="link"
                    >
                        <InlineMath math="O(NK)" /> dp solution
                    </a>{' '}
                    is much more complicated in my opinion, but you're welcome
                    to try and understand it yourself.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
