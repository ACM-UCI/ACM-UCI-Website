/**
 * Defines a Meeting and can be used to calculate whether a Meeting has occured given a current time.
 */
export class Meeting {
    /**
     * Instantiates a new instance of Meeting with a start time (milliseconds) offset after the beginning of the week
     * and a duration (minutes).
     * @param {Integer} startTime - The start time of the meeting given in milliseconds after the week has begun.
     * @param {Integer} duration - How long the meeting occurs for given in minutes.
     */
    constructor(startTime, duration) {
        this.startTime = startTime;
        this.duration = duration;
    }

    static STATE_PRIOR() {
        return 0;
    }
    static STATE_STARTED() {
        return 1;
    }
    static STATE_ENDED() {
        return 2;
    }

    /**
     * Determines what state the Meeting instance is in based on a given time.
     * These states will be one of three constants {PRIOR: 0, STARTED: 1, ENDED: 2} which can be obtained from the
     * static functions: STATE_PRIOR(), STATE_STARTED(), and STATE_ENDED().
     * @param {Integer} currTimeMilli - The number of milliseconds passed since the beginning of the week
     */
    determineState(currTimeMilli) {
        if (isNaN(currTimeMilli)) {
            throw TypeError('Invalid Time Given');
        } else if (currTimeMilli < this.startTime) {
            return Meeting.STATE_PRIOR();
        } else if (currTimeMilli < this.startTime + this.duration * 60000) {
            return Meeting.STATE_STARTED();
        } else {
            return Meeting.STATE_ENDED();
        }
    }
}

// TO DO: MAKE ADDING NEW QUARTERS AUTOMATIC
const config = {
    yearList: [
        '2015-2016',
        '2016-2017',
        '2017-2018',
        '2018-2019',
        '2019-2020',
        '2020-2021'
    ],
    current: '2020-2021', // This must be of form 'prevyear-nextyear'
    // Arranges weekly meeting schedule corresponding to quarter
    meetings: [
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [
            new Meeting(0, 10080) // Tuesday - 2 Days
        ],
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [new Meeting(0, 180), new Meeting(172800000, 180)],
        [new Meeting(0, 180), new Meeting(172800000, 180)]
    ],
    quarters: [
        'Fall 2018',
        'Winter 2019',
        'Spring 2019',
        'Fall 2019',
        'Winter 2020',
        'Spring 2020',
        'Fall 2020',
        'Winter 2021',
        'Spring 2021'
    ],
    dates: [
        new Date('October 2, 2018 18:00:00').getTime(),
        new Date('January 8, 2019 17:00:00').getTime(),
        new Date('April 2, 2019 18:00:00').getTime(),
        new Date('October 1, 2019 17:00:00').getTime(),
        new Date('January 7, 2020 17:00:00').getTime(),
        new Date('March 31, 2020 08:00:00').getTime(), // Tu 8am - Th 8am & Th
        new Date('October 7, 2020 18:00:00').getTime(),
        new Date('January 6, 2021 17:00:00').getTime(),
        new Date('March 31, 2021 17:30:00').getTime()
    ],
    boardAccess: [
        // The date when the board is able to set problems for a specific quarter
        new Date('October 2, 2018 18:00:00').getTime(),
        new Date('January 8, 2019 17:00:00').getTime(),
        new Date('April 2, 2019 18:00:00').getTime(),
        new Date('October 1, 2019 17:00:00').getTime(),
        new Date('January 7, 2020 17:00:00').getTime(),
        new Date('March 31, 2020 08:00:00').getTime(), // Tu 8am - Th 8am & Th
        new Date('October 1, 2020 00:00:00').getTime(),
        new Date('January 3, 2021 00:00:00').getTime(),
        new Date('March 2, 2021 17:00:00').getTime()
    ],
    defaultData: {
        Category: '',
        Name: '',
        Link: '',
        Difficulty: 'Select one',
        Note: '',
        Solution: '',
        Contributor: '',
        Session: undefined,
        Code: '',
        SubmitDate: ''
    },
    supportedLanguage: {
        py: 'python',
        cpp: 'cpp',
        js: 'javascript',
        c: 'cpp',
        go: 'go',
        swift: 'swift',
        java: 'java',
        rb: 'ruby',
        cs: 'cs',
        php: 'php',
        kt: 'kotlin',
        m: 'objectivec'
    },
    social: {
        Facebook: 'https://www.facebook.com/',
        GitHub: 'https://github.com/',
        LinkedIn: 'https://www.linkedin.com/in/'
    },

    difficulties: {
        announcement: 0,
        easy: 1,
        med: 2,
        hard: 3,
        icpc: 4,
        codealong: 5,
        poll: 6,
        finals: 7,
        thanksgiving: 8,
        event: 9
    }
};

export default config;
