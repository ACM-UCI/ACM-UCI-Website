const config = {
    quarters: [
        'Fall 2018',
        'Winter 2019',
        'Spring 2019',
        'Fall 2019',
        'Winter 2020',
        'Spring 2020'
    ],
    dates: [
        new Date('October 2, 2018 18:00:00 GMT-07:00').getTime(),
        new Date('January 8, 2019 17:00:00 GMT-08:00').getTime(),
        new Date('April 2, 2019 18:00:00 GMT-07:00').getTime(),
        new Date('October 1, 2019 18:00:00 GMT-07:00').getTime(),
        new Date('January 7, 2020 18:00:00 GMT-07:00').getTime(),
        new Date('March 31, 2020 18:00:00 GMT-07:00').getTime()
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
    }
};

export default config;
