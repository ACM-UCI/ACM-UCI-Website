import React from 'react';
import { Row, Button, Container } from 'react-bootstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

import pySol from '../../../../data/deadline_dash.py';
import cppSol from '../../../../data/deadline_dash.cpp';

export default function EditorialDeadlineDash() {
    return (
        <Container className="mx-auto text-center">
            <a
                href="https://www.hackerrank.com/contests/uci-ucsd-quarantine-competition/challenges/deadline-dash"
                className="problem-link"
            >
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Deadline Dash</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Given a list of assignments consisting of their release
                    dates, deadlines, and estimated times for completion:
                </p>
                <p>
                    If there is enough time complete all of the assignments
                    print out the unused time, starting from zero and ending at
                    the last deadline.
                </p>
                <p>Otherwise just print out 'f'</p>
            </Container>

            <Container className="text-left">
                <h2>Constraints</h2>
                <Container className="mx-0 w-25">
                    <BlockMath className="text-left">
                        1 \le N \le 10^5
                    </BlockMath>
                    <BlockMath className="text-left">
                        0 \le S_i \lt E_i \le 2 \cdot 10^9
                    </BlockMath>
                    <BlockMath className="text-left">
                        1 \le T_i \lt 2 \cdot 10^9
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
                    Surprisingly, this problem turned out to be a killer for
                    many contestants. Originally, I came up with this as one of
                    the easy questions, but as I started to implement the
                    solution, I soon realized that the implementation was a
                    trickier than at first glance. Even after making the key
                    realizations necessary solve this problem, the solution can
                    still be difficult to implement.
                </p>
                <p>
                    The first key observation that can be made is the binary
                    nature of this problem. There are only two possible answers:
                    'f' and the "unused time" after completing the assignment.
                    Notice that the "unused time" can be simply calculated by
                    summing up the time it takes to complete each assignment and
                    subtracting it from the last deadline.
                    <BlockMath
                        math="\text{unused time} = E_{\text{max}} -
                    \displaystyle\sum_{i=0}^{N-1}T_i"
                    />
                    Because of this property, if partial credit were allowed, a
                    contestant would be able to get at least half the points
                    with only this observation alone.
                </p>
                <p>
                    The second key observation that can be made is that it is
                    always optimal to choose to work on the assignment with
                    earliest deadline first at any given moment, assuming it has
                    been released. However, while this is quite a simple
                    scheduling algorithm learned in a typical operating systems
                    course, there is a specific aspect of this algorithm that
                    makes it difficult to implement: preemption.
                </p>
                <p>
                    The Earliest Deadline First algorithm relies on preemption,
                    the stopping of a task before completion to work on another
                    task, in order to guarantee meeting the deadlines of all
                    tasks. In order to warrant a preemption, a task with a
                    higher priority must enter into the run queue and in the
                    case of EDF the task with the highest priority is the one
                    with the earliest deadline.
                </p>
                <p>
                    In actual operating systems, where tasks may be removed from
                    the runqueue for a variety of reasons, a balanced tree
                    structure may be necessary. However, since tasks only enter
                    when their start time is reached and exit when they are
                    completed, a binary heap is a sufficient data structure for
                    an efficient implementation of EDF.
                </p>
                <p>
                    Here are the steps I used to implement this solution:
                    <ol style={{ paddingLeft: 18 }}>
                        <li>
                            Sort the tasks by starting time, this will represent
                            the timeline
                        </li>
                        <li>
                            Create a min-heap that gives the highest priority to
                            the task with the earliest deadline
                        </li>
                        <li>
                            Load all available tasks at the current time into
                            the runqueue
                        </li>
                        <li>
                            Work on the tasks with the earliest deadlines until
                            the next task on the timeline becomes available.
                        </li>
                        <li>
                            Repeat 3-4, until there are no more tasks on the
                            timeline or a task could not be completed before its
                            deadline.
                        </li>
                        <li>
                            Output 'f' if there are remaining tasks on the
                            runqueue, otherwise output the unused time.
                        </li>
                    </ol>
                </p>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    Total time complexity is{' '}
                    <InlineMath math="O(N\text{log}N)" />
                    because of sorting and pushing and popping{' '}
                    <InlineMath math="O(\text{log}N)" /> from the heap{' '}
                    <InlineMath math="O(N)" />
                    times.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
