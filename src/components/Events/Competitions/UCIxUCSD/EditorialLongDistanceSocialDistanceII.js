import React from 'react';
import ReactDOM from 'react';
import { Row, Button, Container } from 'reactstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

export default function EditorialLongDistanceSocialDistanceII() {
    return (
        <Container className="mx-auto text-center">
            <a href="#" className="problem-link">
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Social Distancing II</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Like Social Distancing I, we are configuring the seats of an airplane with 3 seats on each side and N rows so that the rules of social distancing are adhered to.
                    That is, we want all adjacent seats from an occupied seat to be unoccupied. However, this time, we are looking for the total number of valid configurations configurations.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        0 \le N \le 10^18
                    </BlockMath>
                    <BlockMath className="text-left">
                        1 \le T \le 10
                    </BlockMath>
                </Container>
            </Container>

            <Container className="text-left">
                <a href="#" className="problem-link" download>
                    {' '}
                    {/* This should be the link to download the solution file */}
                    <h2>Solution</h2>
                    <Row>
                        <a href="#" className="mx-1" download>
                            <Button>
                                <i data-feather="download" /> Python Solution
                            </Button>
                        </a>
                        <a href="#" className="mx-1" download>
                            <Button>
                                <i data-feather="download" /> C++ Solution
                            </Button>
                        </a>
                        <a href="#" className="mx-1" download>
                            <Button>
                                <i data-feather="download" /> Java Solution
                            </Button>
                        </a>
                    </Row>
                    <p>

                    </p>
                </a>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    The constraints on N gives us a large hint on how to approach this problem. Since N is so large, we are looking for either a solution in O(lgN) time or faster.
                    However, as an initial strategy, we are going to approach this problem with a slower O(N) strategy before applying a technique to bring this solution down to
                    the desired time. As we approach the problem, we can see that each row can be broken into two columns of 3 seats each. We\'ll solve the problem for one column since each
                    column is independent. We can then simply square the solution (under the modulus) to obtain our results. We can also make the observation that there are only five valid configurations in every row. 
                    Either the row is empty, the row has one person on the left only, the row has one person on the right only, the row has one person in the middle or the row has one person on the left and right.
                </p>
                <p>
                    Let\'s order the rows and observe that the number of ways to apply a configuration depends only on the previous row. For example, the number of ways to make a row 
                    have a person on the left and right is the number of people to make the previous row have no people since any other configuration for the previous row will block us. 
                    Likewise, the number of ways to make a row have a person on the left only is the sum of the ways to make a person on the right only, the ways to make the previous row empty,
                    and the ways to make the previous row middle only.
                </p>
                <p>
                    This gives us a nice recurrence relationship as expressed below. Let <InlineMath>f_{configuration}(m)</InlineMath> be the number of ways that we can have with the 
                    <InlineMath>mth</InlineMath> row in the configuration labelled <InlineMath>configuration</InlineMath>. Then:
                </p>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        f_{\text{one on left}}(m) = f_{\text{one on right}}(m - 1) + f_{\text{one in middle}}(m - 1) + f_{\text{empty}}(m - 1)
                    </BlockMath>
                    <BlockMath className="text-left">
                        f_{\text{one on right}}(m) = f_{\text{one on left}}(m - 1) + f_{\text{one in middle}}(m - 1) + f_{\text{empty}}(m - 1)
                    </BlockMath>
                    <BlockMath className="text-left">
                        f_{\text{middle}}(m) = f_{\text{one on left}}(m - 1) + f_{\text{one in right}}(m - 1) + f_{\text{empty}}(m - 1) +  f_{\text{left and right}}(m - 1)
                    </BlockMath>
                    <BlockMath className="text-left">
                        f_{\text{empty}}(m) = f_{\text{middle}}(m - 1) + f_{\text{one on left}}(m - 1) + f_{\text{one in right}}(m - 1) + f_{\text{empty}}(m - 1) +  f_{\text{left and right}}(m - 1)
                    </BlockMath>
                    <BlockMath className="text-left">
                        f_{\text{left and right}}(m) = f_{\text{middle}}(m - 1) + f_{\text{empty}}(m - 1)
                    </BlockMath>
                </Container>
                <p>
                   For simplicity, let's rename the state "empty" to be 0, "left only" to be 1, "middle only" to be 2, "right only" to be 3, and "left and right" to be 4.
                </p>
                <p>
                    The recurrence gives us an algorithm we can compute: at the ith row let\'s store the number of ways to make each of the 5 configurations and we can compute the number of ways to make
                    each of the 5 configurations in the <InlineMath>(i + 1)th</InlineMath> row. The base case of our recursion is that for all configuration: <InlineMath>f_{configuration}(1)=1</InlineMath> since
                    with only one row, we can place any configuration.
                    Our answer is the sum of the configurations in the Nth row. While directly implementing the math statement is inadvisable and leads to exponential runtime, we can use DP to reduce
                    the time to linear. An outline of such an algorithm is provided below.
                </p>
                <code>
# variables for the previous layer, we can also start at the 0th layer implicitly by setting only empty to be 1
left_only = 1
right_only = 1
middle_only = 1
left_and_right = 1
empty = 1
for i in range(N - 1):
    # Don't forget that we want to store these in new variables
    left_only_next = right_only + middle_only + empty
    right_only_next = left_only + middle_only + empty
    middle_only_next = left_only + right_only + empty + left_and_right
    left_and_right = empty + middle_only
    empty_next = left_only + middle_only + right_only + left_and_right + empty
    # Now replace the old variables with the next
    left_only, right_only, middle_only, left_and_right, empty = left_only_next, right_only_next, middle_only_next, left_and_right, empty_next 
                                                                                        
answer = left_only + right_only + middle_only + left_and_right + empty
                </code>
                <p>
                    However, as noted earlier, this O(N) solution is far too slow to solve the problem. Instead, we observe that our recurrence is linear: each "next step" is only a linear combination
                    of the step prior. So, using a bit of linear algebra, we can turn this into a matrix multiplication problem. Our transformation to our states as indexes allow us to quickly interpret the
                    states as a vector.
                </p>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        f(m) = \begin{bmatrix}1 && 1 && 1 && 1 && 1\\1 && 1 && 
                    </BlockMath>
                    <BlockMath className="text-left">
                        f(0) = \begin{bmatrix}1 \\ 1 \\ 1 \\ 1 \\ 1\end{bmatrix}
                    </BlockMath>
                </Container>
                <p>
                   You can observe that the above equation is a reexpression of our original equation. We can use fast exponentiation under the given modulus to achieve the desired runtime.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
