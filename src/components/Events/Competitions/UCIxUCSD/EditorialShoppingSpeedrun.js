import React from 'react';
import ReactDOM from 'react';
import { Row, Button, Container } from 'reactstrap';
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import '../Editorial.css';

export default function EditorialShoppingSpeedrun() {
    return (
        <Container className="mx-auto text-center">
            <a href="#" className="problem-link">
                {' '}
                {/* This should be link to hackerrank problem */}
                <h1 className="display-3">Name</h1>
            </a>

            <Container className="text-left">
                <h2>Problem Description</h2>{' '}
                {/* Rephrase the problem in simpler terms here */}
                <p>
                    Ut consectetur voluptate et duis ipsum excepteur cupidatat
                    dolore commodo qui deserunt deserunt. Fugiat mollit id velit
                    nisi laboris velit incididunt elit adipisicing qui magna
                    nostrud. Aute nisi dolore proident aute dolor est ex. Sint
                    sint ipsum officia eu ex officia labore minim aute elit
                    magna aliquip.
                </p>
                <p>
                    Nulla velit sit sit nostrud non tempor amet adipisicing sunt
                    deserunt. Sunt eiusmod aliqua occaecat nulla velit. Officia
                    minim dolor veniam amet dolore velit Lorem eiusmod eiusmod
                    ad.
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
                <p>
                    Duis sunt commodo id duis incididunt culpa quis. Do dolor
                    dolore dolore consectetur dolore esse sit reprehenderit non
                    nostrud. Fugiat ut velit adipisicing eiusmod nulla velit
                    minim culpa. Mollit ipsum in adipisicing sit duis eiusmod
                    consequat proident cillum id culpa amet pariatur
                    reprehenderit.
                </p>
                <p>
                    Ipsum commodo incididunt cupidatat nostrud ad sunt ut
                    deserunt aute ipsum veniam in ex. Deserunt sit ea irure et.
                    Velit nostrud mollit exercitation fugiat culpa sunt laboris
                    esse. Incididunt laboris veniam laborum commodo aute. Veniam
                    sunt deserunt ea veniam aliqua exercitation officia dolore
                    reprehenderit est culpa.
                </p>
            </Container>

            <Container className="text-left">
                <h2>Analysis</h2>{' '}
                {/* Provide complexity analysis and other problem observations here*/}
                <p>
                    Pariatur incididunt reprehenderit tempor sit minim. Tempor
                    laborum voluptate labore non est voluptate veniam ex. Lorem
                    exercitation voluptate eiusmod velit anim in ut nulla ea
                    exercitation laboris.
                </p>
                <p>
                    Elit tempor ipsum in tempor. Dolor dolor Lorem velit mollit
                    eiusmod tempor. Est consectetur ad consequat voluptate magna
                    tempor. Elit ullamco eiusmod ad adipisicing aliqua cupidatat
                    esse velit magna voluptate nisi. Qui aliqua deserunt eu do.
                    Ex do tempor sint enim non. Aliquip elit velit fugiat culpa
                    est dolore quis eiusmod excepteur magna et.
                </p>
            </Container>

            {/* Feel free to add addition components as you see fit */}
        </Container>
    );
}
