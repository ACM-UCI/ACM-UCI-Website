import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';
import classnames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/styles/hljs';
import Navigation from '../../Navbar/Navbar';
import Banner from '../../Banner/Banner';
import './IntroCP.css';

class IntroCP extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '2'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const firstCodeBlock = `5 
Apple
Banana
Orange
Strawberry
Peach`;

        const secondCodeBlock = `n = int(input())
for i in range(n):
    word = input()
    print(word)`;

        const thirdCodeBlock = `Apple
Banana
Orange
Strawberry
Peach`;

        const fourthCodeBlock = `import sys
for line in sys.stdin:
    print(line)`;

        const fifthCodeBlock = `import sys
for line in sys.stdin:
    numbers = line.split() # split() takes a string and separates it into a  
                           # list of strings separated by a delimiter
a = int(numbers[0])
b = int(numbers[1])
c = int(numbers[2])
d = int(numbers[3])
e = int(numbers[4])

print(a+b+c+d+e)
`;
        const sixthCodeBlock = `import sys
for line in sys.stdin:
    numbers = list(map(int, line.split()))
    total = sum(numbers)
    print(total)
`;

        return (
            <div>
                <Navigation />
                <Banner
                    lead="New Member Guide"
                    leadSub="Designed by the utterly clueless for the utterly clueless"
                />
                <Container className="mt-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === '1'
                                })}
                                onClick={() => {
                                    this.toggle('1');
                                }}>
                                General Intro
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === '2'
                                })}
                                onClick={() => {
                                    this.toggle('2');
                                }}>
                                Working with I/O
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    {/** ******** INTRODUCTION ********* */}

                                    <h2 className="mt-3">Introduction</h2>
                                    <hr />
                                    <p>
                                        Hello new ACM@UCI member! Welcome to the
                                        world of competitive programming. I’m
                                        Bryon Tjanaka, a first-year computer
                                        science major at UCI. This short guide
                                        is intended to give you a quick
                                        introduction to the club. I’ll go over
                                        some terms, competitions, benefits,
                                        websites, books, programming languages,
                                        software, and other tips in relation to
                                        the club.
                                    </p>

                                    {/** ******** TERMS ********* */}

                                    <h2>Terms</h2>
                                    <hr />
                                    <p>
                                        Here are a few useful terms in the club.
                                    </p>
                                    <h4>
                                        ACM (Association for Computing
                                        Machinery)
                                    </h4>
                                    <p>
                                        ACM is the world’s largest computing
                                        society. For the purposes of this club,
                                        all you really need to know is that they
                                        organize the ICPC, one of the most
                                        prestigious programming competitions for
                                        college students. Find out more at
                                        <a
                                            href="https://www.acm.org/about-acm/about-the-acm-organization"
                                            className="link">
                                            {' '}
                                            acm.org
                                        </a>
                                    </p>
                                    <h4>Competitive programming</h4>
                                    <p>
                                        An activity where participants compete
                                        to solve algorithm problems within a
                                        given time limit (see{' '}
                                        <a
                                            href="https://en.wikipedia.org/wiki/Competitive_programming"
                                            className="link">
                                            wikipedia
                                        </a>
                                        for more)
                                    </p>

                                    {/** ******** COMPETITIONS ********* */}

                                    <h2>Competitions</h2>
                                    <hr />
                                    <p>
                                        Every year, ACM@UCI members compete in
                                        various programming competitions. The
                                        two biggest ones are:
                                    </p>
                                    <ul>
                                        <li>
                                            IEEExtreme: A 24-hour competition
                                            held sometime in October every year.
                                            Basically, you have 24 hours to
                                            solve around 30 problems or so. Find
                                            out more at{' '}
                                            <a
                                                href="https://en.wikipedia.org/wiki/IEEEXtreme"
                                                className="link">
                                                wikipedia
                                            </a>{' '}
                                            and
                                            <a
                                                href="http://ieeextreme.org/"
                                                className="link">
                                                ieeextreme
                                            </a>
                                            . This competition is held online,
                                            but students gather in a room on the
                                            UCI campus to be supervised by a
                                            proctor.
                                        </li>
                                        <li>
                                            ACM ICPC (International Collegiate
                                            Programming Contest): A 5-hour
                                            competition held sometime in
                                            November every year. There are 10
                                            problems in the competition. For
                                            this competition, students have to
                                            **physically** travel. ACM@UCI
                                            competes in the ACM ICPC SoCal
                                            regional every year. Typically, we
                                            leave sometime in the morning, spend
                                            a few hours doing all the
                                            pre-competition stuff like lunch and
                                            warmup sessions, start the
                                            competition sometime in the
                                            afternoon, and arrive back sometime
                                            at night. Find out more at
                                            <a
                                                href="https://en.wikipedia.org/wiki/ACM_International_Collegiate_Programming_Contest"
                                                className="link">
                                                {' '}
                                                wikipedia
                                            </a>
                                            ,
                                            <a
                                                href="https://icpc.baylor.edu/"
                                                className="link">
                                                {' '}
                                                icpc
                                            </a>{' '}
                                            and
                                            <a
                                                href="http://socalcontest.org/current/index.shtml"
                                                className="link">
                                                {' '}
                                                socalcontest
                                            </a>
                                            .
                                        </li>
                                    </ul>
                                    <p>
                                        For both of these competitions, students
                                        compete in teams of 3. For the ICPC,
                                        there is usually a pre-competition among
                                        ACM@UCI members to determine who the
                                        club will send. In addition to these
                                        competitions, members participate in
                                        various individual online competitions
                                        throughout the year, on websites such as
                                        HackerRank, Kattis, and CodeForces (see
                                        Websites).
                                    </p>

                                    {/** ******** BENEFITS ********* */}

                                    <h2>Benefits</h2>
                                    <hr />
                                    <p>
                                        There are a ton of benefits to doing
                                        competitive programming. Here are just a
                                        few:
                                    </p>
                                    <ol>
                                        <li>
                                            It’s really fun. You’ll meet a lot
                                            of people through the club, and
                                            you’ll ultimately become friends as
                                            you struggle together to solve
                                            problems.
                                        </li>
                                        <li>
                                            You’ll learn a ton of problem
                                            solving skills. Doing these kinds of
                                            problems requires a certain way of
                                            thinking that you simply can’t get
                                            from standard college classes.
                                        </li>
                                        <li>
                                            You’ll feel on top of the world when
                                            you know you can solve problems most
                                            of your peers can’t (PS: ask them to
                                            join too - the more the merrier).
                                        </li>
                                        <li>
                                            You’ll do extremely well in job
                                            interviews. If you get good at
                                            solving these kinds of problems, you
                                            won’t even bat an eye in an
                                            interview.
                                        </li>
                                    </ol>

                                    {/** ******** WEBSITES ********* */}
                                    <h2>Websites</h2>
                                    <hr />
                                    <p>
                                        There are tons of websites where you can
                                        find programming problems, lessons, and
                                        competitions. Here are a few:
                                    </p>
                                    <ol>
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/"
                                                className="link">
                                                GeeksForGeeks
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.hackerrank.com/dashboard"
                                                className="link">
                                                Hackerrank
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="http://codeforces.com/"
                                                className="link">
                                                Codeforces
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://open.kattis.com/"
                                                className="link">
                                                Kattis
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://uva.onlinejudge.org/"
                                                className="link">
                                                UVa (University of Valladolid)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="http://poj.org/"
                                                className="link">
                                                POJ
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://csacademy.com/"
                                                className="link">
                                                CSAcademy
                                            </a>
                                        </li>
                                    </ol>

                                    {/** ******** BOOKS ********* */}
                                    <h2>Books</h2>
                                    <hr />
                                    <p>
                                        Here are some books on competitive
                                        programming:
                                    </p>
                                    <ol>
                                        <li>
                                            <a
                                                href="https://cses.fi/book.html"
                                                className="link">
                                                Competitive Programmer's
                                                Handbook{' '}
                                            </a>
                                            (recommended if you just want to
                                            read)
                                        </li>
                                        <li>
                                            <a
                                                href="https://cpbook.net/#CP3details"
                                                className="link">
                                                Competitive Programming, 3rd
                                                Edition by Steven Halim
                                            </a>{' '}
                                            (recommended for its vast number of
                                            problems)
                                        </li>
                                    </ol>

                                    {/** ******** PROGRAMMING LANGUAGES ********* */}
                                    <h2>Programming Languages</h2>
                                    <hr />
                                    <p>
                                        C++, Java, and Python are the more
                                        common languages for competitions. Out
                                        of these 3 languages, competitive
                                        programmers often use C++ because it is
                                        the fastest, but Java and Python are
                                        usually good enough to solve a problem..
                                        As a general rule of thumb, Java is 2x
                                        slower than C++, and Python is 10-100x
                                        (some say 20-40x) slower. Even if you
                                        end up using Python for most of your
                                        programming, you should at least
                                        understand C++ because many of the best
                                        sample solutions are written in C++.
                                        Java also has some unique features, like
                                        its BigInteger and BigDecimal classes,
                                        that make it more useful than C++ in
                                        some cases. Ultimately, you will want to
                                        be at least somewhat familiar with all
                                        three of these languages. If there is a
                                        language you want to learn quickly, I
                                        would recommend picking up a book about
                                        it and just speeding through it (usually
                                        skimming the first few introductory
                                        chapters), but of course, there are many
                                        ways to learn a new language.
                                    </p>

                                    <p>
                                        Also, most (all?) programming problems
                                        will require you to use stdin and stdout
                                        for your input and output. You’ll want
                                        to read
                                        <a
                                            href="http://socalcontest.org/current/sample.shtml"
                                            className="link">
                                            {' '}
                                            this article{' '}
                                        </a>
                                        about how to use them.
                                    </p>

                                    <p>
                                        For C++, make sure to use
                                        #include&lt;bits/stdc++.h&gt; for your
                                        header files. This include file
                                        basically includes every single standard
                                        C++ library, saving you from having to
                                        type out all of the include statements.
                                        However, this only works on GNU
                                        compilers (which all the contests use
                                        anyway). PS: don’t use this on job
                                        interviews or any other serious
                                        programming projects - it’s really bad
                                        style.
                                    </p>

                                    {/** ******** SOFTWARE ********* */}
                                    <h2>Software</h2>
                                    <hr />
                                    <p>
                                        In many online competitions like
                                        IEEExtreme and those on HackerRank, the
                                        editor is provided on the website, and
                                        as such, you do not need to have any
                                        software installed. However, for some
                                        competitions like ICPC and those on UVa,
                                        you will have to code the problem on
                                        your computer and then submit it online.
                                        For this purpose, the club has no
                                        specific software, but you will
                                        definitely want to get something that
                                        allows you to efficiently run your
                                        programs with test input. You may also
                                        want to learn to use the command line.
                                        Right now, for instance, I use Visual
                                        Studio Code to edit my programs, and I
                                        then run them from the Git Bash command
                                        line integrated into VS Code, with input
                                        redirection. If using the command line,
                                        you will need to know about how to
                                        download the appropriate compilers, set
                                        your PATH variables on your system, and
                                        redirect standard input and output. To
                                        integrate Git Bash into VS Code, follow
                                        the instructions at{' '}
                                        <a
                                            href="https://stackoverflow.com/questions/42606837/how-to-use-bash-on-windows-from-visual-studio-code-integrated-terminal"
                                            className="link">
                                            this link
                                        </a>
                                        .
                                    </p>

                                    <p>
                                        <a
                                            href="https://stackoverflow.com/questions/43427631/how-to-add-multiple-terminal-in-vs-code"
                                            className="link">
                                            This link
                                        </a>{' '}
                                        also describes how to install multiple
                                        terminals into VS Code, if you wish to
                                        use more than one kind.
                                    </p>

                                    <p>
                                        Another great editor out there is called
                                        Clion and can be found at
                                        <a
                                            href="https://www.jetbrains.com/clion/"
                                            className="link">
                                            {' '}
                                            jetbrains
                                        </a>
                                        . It is directly geared towards
                                        programming in C/C++ and has a great
                                        interface. Furthermore, there is also a
                                        Java version at{' '}
                                        <a
                                            href="https://www.jetbrains.com/idea/?fromMenu"
                                            className="link">
                                            jetbrains
                                        </a>
                                        . Both are paid software tools, but are
                                        free for university students!
                                    </p>

                                    {/** ******** OTHER TIPS ********* */}
                                    <h2>Other Tips</h2>
                                    <hr />
                                    <ol>
                                        <li>
                                            <strong>Don't give up!</strong> One
                                            day you’ll develop “the eye” - i.e.
                                            you’ll learn to recognize each
                                            problem and automatically know what
                                            kinds of algorithms you should
                                            implement and how to implement them.
                                        </li>
                                        <li>
                                            <strong>
                                                Attend as many meetings and
                                                competitions as you can,
                                            </strong>{' '}
                                            even if you don’t understand stuff.
                                            Study more on your own, and
                                            eventually you’ll get good at it.
                                        </li>
                                    </ol>

                                    <p className="conclusion text-center">
                                        <strong>
                                            Overall, welcome to ACM@UCI, and
                                            best of luck in your career as a
                                            competitive programmer!
                                        </strong>
                                    </p>

                                    <hr className="mb-5" />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <h2 className="mt-3">
                                        Reading from stdin and Writing to stdout
                                    </h2>
                                    <hr />
                                    <p>
                                        This article covers input for
                                        competitive programming problems using
                                        Python. For a quick intro in multiple
                                        languages, see
                                        <a
                                            href="http://socalcontest.org/current/sample.shtml"
                                            className="link">
                                            {' '}
                                            socalcontest
                                        </a>
                                        .
                                    </p>

                                    <p>
                                        For more problems to get you accustomed
                                        to stdin and stdout in Python, see
                                        <a
                                            href="https://www.hackerrank.com/domains/python/py-introduction"
                                            className="link">
                                            {' '}
                                            hackerrank
                                        </a>
                                        .
                                    </p>

                                    <p>
                                        Most, if not all, competitive
                                        programming problems will require you to
                                        read input from stdin and write output
                                        to stdout. So what exactly are these?
                                    </p>

                                    <p>
                                        Every program has associated with it 3
                                        “streams.” These are stdin, which means
                                        standard input; stdout, which means
                                        standard output; and stderr, which means
                                        standard error. When you run such a
                                        program, it will accept user input
                                        through stdin, provide feedback to the
                                        user through stdout, and send any errors
                                        to stderr. Usually, you don’t need to
                                        worry about stderr, as there is never a
                                        need to write to it in problems. Note
                                        that whenever you write a program for a
                                        programming problem, the input for stdin
                                        will not come from a user; rather, it
                                        will come from the computer.
                                    </p>

                                    <h2>
                                        So how do you read input from stdin and
                                        write to stdout?
                                    </h2>
                                    <hr />
                                    <p>
                                        Though it may sound daunting at first,
                                        the procedure is actually really simple.
                                        In Python, the function{' '}
                                        <span className="code-text">
                                            input()
                                        </span>{' '}
                                        will read in one line of input.
                                        Meanwhile, calling{' '}
                                        <span className="code-text">
                                            print()
                                        </span>{' '}
                                        on whatever strings you wish to output
                                        will send them to stdout. Essentially,
                                        the same functions that you have
                                        probably used for input and output in
                                        ICS 31 are the ones that allow you to
                                        read from stdin and write to stdout.
                                    </p>

                                    <p>
                                        Here’s a demonstration. Say you are
                                        given the following simple problem:
                                    </p>
                                    <p className="problem-desc">
                                        "Jack needs to copy several words. He
                                        will receive input as follows. The first
                                        line of input will be n, the number of
                                        words to copy. The next n lines will be
                                        the words to copy. Output those words to
                                        stdout."
                                    </p>

                                    <p>Here would be a sample input:</p>
                                    <SyntaxHighlighter
                                        language="python"
                                        style={hybrid}>
                                        {firstCodeBlock}
                                    </SyntaxHighlighter>

                                    <p>To solve this in Python, we write:</p>
                                    <SyntaxHighlighter
                                        language="python"
                                        style={hybrid}>
                                        {secondCodeBlock}
                                    </SyntaxHighlighter>

                                    <p>
                                        The{' '}
                                        <span className="code-text">int()</span>{' '}
                                        function takes a piece of data and tries
                                        to convert it into an integer. The{' '}
                                        <span className="code-text">
                                            input()
                                        </span>{' '}
                                        function always returns a string, so it
                                        is necessary for us to convert it. The
                                        line{' '}
                                        <span className="code-text">
                                            word = input()
                                        </span>{' '}
                                        will simply read in a line from stdin
                                        and store it in word. Finally,{' '}
                                        <span className="code-text">
                                            print(word)
                                        </span>{' '}
                                        puts word in stdout.
                                    </p>

                                    <h2>
                                        Oftentimes, input to a program will be
                                        much more complicated...
                                    </h2>
                                    <hr />
                                    <p>
                                        For instance, you may not be given any
                                        indication of the number of lines your
                                        program will take in. For instance, the
                                        problem above might be modified to say:
                                    </p>

                                    <p className="problem-desc">
                                        "Jack needs to copy several words. He
                                        will receive an unspecified number of
                                        words. Output those words to stdout."
                                    </p>

                                    <p>With input looking like:</p>
                                    <SyntaxHighlighter
                                        language="python"
                                        style={hybrid}>
                                        {thirdCodeBlock}
                                    </SyntaxHighlighter>

                                    <p>
                                        To handle this case, we write the
                                        following Python code:
                                    </p>
                                    <SyntaxHighlighter
                                        language="python"
                                        style={hybrid}>
                                        {fourthCodeBlock}
                                    </SyntaxHighlighter>

                                    <p>
                                        The for loop basically says “give me
                                        every line from stdin, one at a time.”
                                        When there are no more lines, the
                                        program terminates.
                                    </p>

                                    <p>
                                        An even more common situation involves
                                        having to read in many numbers from each
                                        line of stdin. For example:
                                    </p>
                                    <p className="problem-desc">
                                        "Jack is given several rows of numbers.
                                        He needs to add up these rows of numbers
                                        and produce a sum. He is not told
                                        beforehand how many rows of numbers he
                                        will be given, but he does know that
                                        each row has only 5 numbers."
                                    </p>

                                    <p>Below is one way of doing this.</p>
                                    <SyntaxHighlighter
                                        language="python"
                                        style={hybrid}>
                                        {fifthCodeBlock}
                                    </SyntaxHighlighter>

                                    <p>
                                        This works, but it is rather “clunky.”
                                        Certainly, we would not want to keep
                                        typing{' '}
                                        <span className="code-text">
                                            numbers[x]
                                        </span>
                                        . Furthermore, what if the number of
                                        numbers in each line changes? Say there
                                        are now 100 numbers in each line. In
                                        that case, you would have to make up 100
                                        variables with this method! Even worse,
                                        the number of numbers per line could
                                        change, causing you to run into errors
                                        because the numbers list is too short.
                                        For instance,
                                    </p>

                                    <p className="problem-desc">
                                        "Jack is given several rows of numbers.
                                        He needs to add up these rows of numbers
                                        and produce a sum. He is not told
                                        beforehand how many rows of numbers he
                                        will be given, and he has no idea how
                                        many numbers each row will contain."
                                    </p>

                                    <p>This forces us to use something else.</p>
                                    <SyntaxHighlighter
                                        language="python"
                                        style={hybrid}>
                                        {sixthCodeBlock}
                                    </SyntaxHighlighter>

                                    <p>
                                        The map function’s syntax is something
                                        like this:{' '}
                                        <span className="code-text">
                                            map(function, iterable)
                                        </span>
                                        , where an iterable is something like a
                                        set, list, or dict. It applies the
                                        function to every item in the iterable
                                        (in this case, it applies{' '}
                                        <span className="code-text">int()</span>{' '}
                                        to every string in{' '}
                                        <span className="code-text">
                                            line.split())
                                        </span>
                                        , and then it returns an iterator to
                                        those results. You don’t really need to
                                        know what an iterator is right now, but
                                        just know that we have to call the{' '}
                                        <span className="code-text">
                                            list()
                                        </span>
                                        function to convert the result of a map
                                        into a list. This list is then stored in
                                        numbers.
                                    </p>

                                    <p>
                                        The rest of the program is simple. The
                                        sum function calculates the sum of the
                                        values in a list, so this call to sum
                                        puts its result in total. We then print
                                        total to finish this line of numbers.
                                        The calls repeat for every line in
                                        stdin.
                                    </p>

                                    <p>
                                        Overall, reading from stdin is not very
                                        hard. As you have to do it for virtually
                                        every single problem, you will certainly
                                        become much better at doing it. If you
                                        have any questions, feel free to ask
                                        anybody in the club for help!
                                    </p>
                                    <hr className="mb-5" />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
        );
    }
}

export default IntroCP;
