import React from 'react';
import ReactDOM from 'react';
import { Row, Button, Container } from 'reactstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

export default function EditorialToiletPaperTravesty() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/toilet-paper-travesty"
                className="problem-link"
                target="_blank"
                rel="noopener noreferrer">
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Toilet Paper Travesty</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    You are given an array <InlineMath>A</InlineMath> of length{' '}
                    <InlineMath>N</InlineMath> where{' '}
                    <InlineMath>A_i</InlineMath> repesents the strength of the{' '}
                    <InlineMath>{'i^{th}'}</InlineMath> square of toilet paper
                    in a stack. You wish to pick a subsequence (does not have to
                    be a contiguous subarray) of length{' '}
                    <InlineMath>K</InlineMath>. From this subsequence, you find
                    the minimum strength among all odd-indexed squares and the
                    minimum strength among all even-indexed squares (index
                    refers to position in the subsequence). Between these two
                    minimum values you want to find the maximum value{' '}
                    <InlineMath>{'max(min_{odd}, min_{even})'}</InlineMath>.
                </p>
                <p>The problem asks for the maximum this value can be.</p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        1 \le K \le N \le 10^6
                    </BlockMath>
                    <BlockMath className="text-left">
                        1 \le A_i \le 10^9
                    </BlockMath>
                </Container>
            </Container>

            <Container className="text-left">
                <a href="#" className="problem-link" download>
                    {' '}
                    {/* This should be the link to download the solution file */}
                    <h2>Solution</h2>
                </a>
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

                <Container className="my-4">
                    <h4>Incorrect Approaches</h4>
                    <Container>
                        <b>
                            <h5>Greedy</h5>
                        </b>
                        <p>
                            The overwhelming majority of people who attempted
                            this problem tried to use a greedy approach. Their
                            solutions typically fell along the lines of
                            performing a sort and attempting to pull out k
                            values such that parity is kept correct. The issue
                            with this approach is that it results in a wrong
                            answer.
                        </p>
                        <p>Consider the following test case:</p>
                        <code>
                            10 6 <br />
                            1000 5 100 2000 99 200 110 1500 98 99
                        </code>
                        <p>
                            If you employ a strategy of putting all of the
                            larger values in the odd set and all the other
                            values in the smaller set you can achive the
                            following subsequence
                        </p>
                        <code>1000 5 2000 99 1500 98</code>
                        <p>
                            Whereas, if you had employed a greedy solution you
                            would've had a subsequence like:
                        </p>
                        <code>1000 100 2000 200 110 1500</code>
                        <p>
                            The reason, in general, that greedy does not work is
                            because deciding whether to include a value in the
                            subsequence requires knowing information about the
                            rest of the array. Hence, you cannot assume that a
                            choice made locally will be optimal.
                        </p>
                    </Container>
                    <Container>
                        <b>
                            <h5>Brute Force</h5>
                        </b>
                        <p>
                            Attacking this problem with a brute force approach
                            would've awarded more points than a greedy approach.
                            The basic premise of this approach is to do a
                            recursive backtrack where you test the decision of
                            adding a value to your subsequence or excluding it.
                            While doing this, you have to keep track of the
                            total number of values you have added as well as the
                            running minimum among the even and odd indexes of
                            the subsequence.
                        </p>
                        <p>
                            The obvious flaw with this approach is its time
                            complexity. Although attempts can be made to prune
                            the search, it will still remain on the order of{' '}
                            <InlineMath>O(2^N)</InlineMath> which is only
                            feasible for <InlineMath>N \le 20</InlineMath>
                        </p>
                    </Container>
                    <Container>
                        <b>
                            <h5>Dynamic Programming</h5>
                        </b>
                        <p>
                            Given that there exists a brute force solution there
                            also exists a dynamic programmins solution. For this
                            problem it is likely easy to do a top-down dp
                            solution.
                        </p>
                        <p>
                            The key here is to identify the different possible
                            states so that they can be cached and reused. While
                            it is technically possible to attempt to implement
                            such a solution, doing so correctly can become very
                            difficult and it would still result in a time limit
                            exceeded. The reason this is the case is because
                            there are too many possible states: somewhere on the
                            order of <InlineMath>O(N*K)</InlineMath> states.
                            Thus, the dp solution is not much better than the
                            brute force approach.
                        </p>
                    </Container>
                </Container>

                <Container className="my-4">
                    <h4>
                        Correct Approach: Binary Search + Greedy Predicate Check
                    </h4>
                    <p>
                        Likely the reason this problem was so difficult for most
                        was the fact that most are not used to thinking about
                        binary searches in this way. We typically associate
                        binary searches with finding the location of a value in
                        an ordered data structure.
                    </p>
                    <p>
                        Although binary search is sufficient for such tasks, its
                        power goes way beyond. Many people often forget that{' '}
                        <InlineMath>O(logN)</InlineMath> is very small, and
                        thus, <InlineMath>O(N logN)</InlineMath> or even{' '}
                        <InlineMath>O(N log^2N)</InlineMath> are feasible in
                        most competitive programming problems.
                    </p>
                    <p>
                        This particular problem belongs to a well known subset
                        of problems called mini-max. Such problems can be solved
                        by binary searching for the answer{' '}
                        <InlineMath>O(logN)</InlineMath> and then checking the
                        correctness of the answer in linear time{' '}
                        <InlineMath>O(N)</InlineMath>.
                    </p>
                    <p>
                        If you apply this strategy to this problem you can
                        perform an <InlineMath>O(N)</InlineMath> greedy
                        predicate check. If you make some guess{' '}
                        <InlineMath>G</InlineMath> then you can iterate through
                        the array <InlineMath>A</InlineMath> and greedily only
                        add values <InlineMath>A_i</InlineMath> to your odd
                        subsequence if <InlineMath>A_i \ge G</InlineMath>. You
                        can then repeat this for the even subsequence. If either
                        attempts yield a subsequence of size greater than or
                        equal to <InlineMath>K</InlineMath> then you know your
                        guess is a possible solution. Using the binary search
                        you can narrow down your guesses until you have found
                        the optimal answer.
                    </p>

                    <p>
                        The range over which you implement this binary search
                        can either be all possible values of{' '}
                        <InlineMath>1 \le A_i \le 10^9</InlineMath> or you can
                        make the observation that the answer will always be in
                        the array <InlineMath>A</InlineMath> so you instead sort{' '}
                        <InlineMath>A</InlineMath> and binary search over that.
                    </p>
                </Container>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    The binary search is <InlineMath>O(logN)</InlineMath> and
                    for each step of the binary search a check must be made to
                    determine if the guess is a valid solution{' '}
                    <InlineMath>O(N)</InlineMath>. Altogether this results in a
                    solution which <InlineMath>O(NlogN)</InlineMath>.
                </p>
                <Container>
                    <h4>More About Binary Search</h4>
                    <p>
                        Binary search is a very common type of problem in
                        competitive programming as its usage is extraordinarily
                        extensive. Usually the challenge is to identify when a
                        problem is binary search.
                    </p>
                    <p>
                        If you would like more practice on binary searches I
                        highly recommend the{' '}
                        <a
                            className="body-link"
                            href="https://codeforces.com/edu/courses"
                            targe="_blank"
                            rel="noopener noreferrer">
                            ITMO Academy Pilot Course
                        </a>{' '}
                        on Codeforces. This is an ongoing series that provides
                        videos and written tutorials on various programming
                        topics. Included is a series covering the the
                        applications and tricks with binary searches. You will
                        need to enroll in the course (completely free) to view
                        this.
                    </p>
                </Container>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
