import React from 'react';
import { Row, Button, Container } from 'react-bootstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';
import pySol from '../../../../data/long_distance_social_distancing_ii.py';
import cppSol from '../../../../data/long_distance_social_distancing_ii.cpp';
import javaSol from '../../../../data/long_distance_social_distancing_ii.java';
import seatDiagram from '../../../../img/seats_ii.png';

export default function EditorialLongDistanceSocialDistanceII() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/long-distance-social-distance/problem"
                className="problem-link"
            >
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Social Distancing II</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Like Social Distancing I, we are configuring the seats of an
                    airplane with 3 seats on each side and N rows so that the
                    rules of social distancing are adhered to. That is, we want
                    all adjacent seats from an occupied seat to be unoccupied.
                    However, this time, we are looking for the total number of
                    valid configurations configurations.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath
                        className="text-left"
                        math="0 \le N \le 10^{18}"
                    ></BlockMath>
                    <BlockMath className="text-left">1 \le T \le 10</BlockMath>
                </Container>
            </Container>

            <Container className="text-left">
                <a href={pySol} className="problem-link" download>
                    {' '}
                    {/* This should be the link to download the solution file */}
                    <h2>Solution</h2>
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
                    <p></p>
                </a>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    The constraints on N gives us a large hint on how to
                    approach this problem. Since{' '}
                    <InlineMath math="N"></InlineMath> is so large, we are
                    looking for either a solution in{' '}
                    <InlineMath math="O(lgN)"></InlineMath> time or faster.
                    However, as an initial strategy, we are going to approach
                    this problem with a slower{' '}
                    <InlineMath math="O(N)"></InlineMath> strategy before
                    applying a technique to bring this solution down to the
                    desired time. As we approach the problem, we can see that
                    each row can be broken into two columns of 3 seats each.
                    We'll solve the problem for one column since each column is
                    independent. After we solve one side, we can simply square
                    (under our modulus) it to obtain the total number of
                    combinations. We can then simply square the solution (under
                    the modulus) to obtain our results. We can also make the
                    observation that there are only five valid configurations in
                    every row. Either the row is empty, the row has one person
                    on the left only, the row has one person on the right only,
                    the row has one person in the middle or the row has one
                    person on the left and right.
                </p>
                <img src={seatDiagram} alt="example"></img>
                <p>
                    Let's order the rows and observe that the number of ways to
                    apply a configuration depends only on the previous row. The
                    diagram above demonstrates how we can add a row with 2 seats
                    occupied where green signifies anything that makes the
                    previous row valid. Since we need the previous row to either
                    be unoccupied or only have one person in the middle, the
                    number of configurations to make the previous rows end with
                    either an unoccupied row or one in the middle determines how
                    many configurations with 2 occupied in the next row.
                </p>
                <p>
                    The number of ways to make a row have a person on the left
                    and right is the sum of the number of people to make the
                    previous row have no people or only have a person in the
                    middle since any other configuration for the previous row
                    will block us and ending in those seating arrangements means
                    each configuration between the two sets is unique. Likewise,
                    the number of ways to make a row have a person on the left
                    only is the sum of the ways to make a person on the right
                    only, the ways to make the previous row empty, and the ways
                    to make the previous row middle only.
                </p>
                <p>
                    This gives us a nice recurrence relationship as expressed
                    below. Let{' '}
                    <InlineMath math="f_{configuration}(m)"></InlineMath> be the
                    number of ways that we can have with the{' '}
                    <InlineMath>mth</InlineMath> row in the configuration
                    labelled <InlineMath>configuration</InlineMath>. Then:
                </p>
                <Container className="mx-0 w-25">
                    <BlockMath
                        className="text-left"
                        math={`f_{\\text{empty}}(m) = f_{\\text{middle}}(m - 1) + f_{\\text{one on left}}(m - 1) + f_{\\text{one in right}}(m - 1) + f_{\\text{empty}}(m - 1) +  f_{\\text{left and right}}(m - 1)`}
                    ></BlockMath>
                    <BlockMath
                        className="text-left"
                        math={`f_{\\text{one on left}}(m) = f_{\\text{one on right}}(m - 1) + f_{\\text{one in middle}}(m - 1) + f_{\\text{empty}}(m - 1)`}
                    ></BlockMath>
                    <BlockMath
                        className="text-left"
                        math={`f_{\\text{middle}}(m) = f_{\\text{one on left}}(m - 1) + f_{\\text{one in right}}(m - 1) + f_{\\text{empty}}(m - 1) +  f_{\\text{left and right}}(m - 1)`}
                    ></BlockMath>
                    <BlockMath
                        className="text-left"
                        math={`f_{\\text{one on right}}(m) = f_{\\text{one on left}}(m - 1) + f_{\\text{one in middle}}(m - 1) + f_{\\text{empty}}(m - 1)`}
                    ></BlockMath>
                    <BlockMath
                        className="text-left"
                        math={`f_{\\text{left and right}}(m) = f_{\\text{middle}}(m - 1) + f_{\\text{empty}}(m - 1)`}
                    ></BlockMath>
                </Container>
                <p>
                    For simplicity, let's rename the state "empty" to be 0,
                    "left only" to be 1, "middle only" to be 2, "right only" to
                    be 3, and "left and right" to be 4.
                </p>
                <p>
                    The recurrence gives us an algorithm we can compute: at the
                    ith row let's store the number of ways to make each of the 5
                    configurations and we can compute the number of ways to make
                    each of the 5 configurations in the{' '}
                    <InlineMath>(i + 1)th</InlineMath> row. The base case of our
                    recursion is that for all configuration:{' '}
                    <InlineMath math="f_{configuration}(1)=1"></InlineMath>{' '}
                    since with only one row, we can place any configuration.
                    Since we are working under the modulus{' '}
                    <InlineMath math="10^9 + 7"></InlineMath>, we can simply
                    perform the recursion under the modulus.
                </p>
                <p>
                    Our answer is the sum of the configurations in the{' '}
                    <InlineMath math="N"></InlineMath>th row squared under the
                    modulus. While directly implementing the math statement is
                    inadvisable and leads to exponential runtime, we can use DP
                    to reduce the time to linear. An outline of such an
                    algorithm is provided below.
                </p>
                <code lang="python">
                    # variables for the previous layer, we can also start at the
                    0th layer implicitly by setting only empty to be 1
                    <br />
                    left_only = 1
                    <br />
                    right_only = 1
                    <br />
                    middle_only = 1
                    <br />
                    left_and_right = 1
                    <br />
                    empty = 1
                    <br />
                    mod = 10 ** 9 + 7
                    <br />
                    for i in range(N - 1):
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;# Don't forget that we want to store
                    these in new variables
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;left_only_next = ((right_only +
                    middle_only) % mod + empty) % mod
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;right_only_next = ((left_only +
                    middle_only) % mod + empty) % mod
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;middle_only_next = ((left_only +
                    right_only) % mod + (empty + left_and_right) % mod) % mod
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;left_and_right = (empty +
                    middle_only) % mod
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;empty_next = ((left_only +
                    middle_only) % mod + (right_only + left_and_right) % mod +
                    empty) % mod
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;# Now replace the old variables with
                    the next
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;left_only, right_only, middle_only,
                    left_and_right = left_only_next, right_only_next,
                    middle_only_next, left_and_right
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;empty = empty_next
                    <br />
                    combos = (left_only + right_only + middle_only +
                    left_and_right + empty) % mod
                    <br />
                    answer = (combos ** 2) % mod
                </code>
                <p>
                    However, as noted earlier, this{' '}
                    <InlineMath math="O(N)"></InlineMath> solution is far too
                    slow to solve the problem. Instead, we observe that our
                    recurrence is linear: each "next step" is only a linear
                    combination of the step prior. So, using a bit of linear
                    algebra, we can turn this into a matrix multiplication
                    problem (the coefficients of our recurrence above become the
                    elements of the matrix). Our transformation to our states as
                    indexes allow us to quickly interpret the states as a
                    vector.
                </p>
                <Container className="mx-0 w-25">
                    <BlockMath
                        className="text-left"
                        math={`f(m) = \\begin{bmatrix}1 && 1 && 1 && 1 && 1 \\\\ 1 && 0 && 1 && 1 && 0 \\\\ 1 && 1 && 0 && 1 && 1 \\\\ 1 && 1 && 1 && 0 && 0 \\\\ 1 && 0 && 1 && 0 && 0 \\end{bmatrix}f(m - 1)`}
                    ></BlockMath>
                    <BlockMath
                        className="text-left"
                        math={`f(1) = \\begin{bmatrix}1 \\\\ 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{bmatrix}`}
                    ></BlockMath>
                    <BlockMath
                        className="text-left"
                        math={`f(m) = \\begin{bmatrix}1 && 1 && 1 && 1 && 1 \\\\ 1 && 0 && 1 && 1 && 0 \\\\ 1 && 1 && 0 && 1 && 1 \\\\ 1 && 1 && 1 && 0 && 0 \\\\ 1 && 0 && 1 && 0 && 0 \\end{bmatrix}^{m-1}\\begin{bmatrix}1 \\\\ 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{bmatrix}`}
                    ></BlockMath>
                </Container>
                <p>
                    You can observe that the above equation is a reexpression of
                    our original equation. We can use fast exponentiation under
                    the given modulus to achieve the desired runtime. We can
                    handle the special case of 0 to return 1, or we can start
                    from the vector
                    <InlineMath math="\begin{bmatrix}1 \\ 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}"></InlineMath>{' '}
                    and use the mth power of the matrix instead. Using fast
                    exponentiation, we obtain a runtime of{' '}
                    <InlineMath math="O(log(m))"></InlineMath> per test case.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
