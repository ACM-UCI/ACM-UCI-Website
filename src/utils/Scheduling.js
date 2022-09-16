import config, { Meeting } from '../components/config';

const START_TIMES = config.dates;
const QUARTERS = config.quarters;
const BOARD_QUARTERS = config.boardAccess;
const ALL_MEETINGS = config.meetings;
const MEETINGS = ALL_MEETINGS[ALL_MEETINGS.length - 1];

export const state = {
    initialized: false,
    datetime: new Date(),
    quarterStart: undefined,
    quarter: undefined,
    quarterIndex: undefined,
    week: undefined,
    session: undefined,
    currentSessionOver: false,
};

async function computeSchedule(data) {
    state.datetime = new Date(data.datetime);

    // state.datetime = new Date('January 13, 2022 17:00:01'); // Use for testing
    // Verify time is valid ------------------------------------------------------------------
    if (
        !(state.datetime instanceof Date) ||
        Number.isNaN(state.datetime.getTime())
    ) {
        return Promise.reject(
            new TypeError(
                "We noticed that your computer's clock is not set correctly. Please set it correctly for better performance! :)"
            )
        );
    }

    const currTimeMilli = state.datetime.getTime();

    // Determine Quarter ---------------------------------------------------------------------
    let q = 0;
    while (
        q + 1 < QUARTERS.length &&
        q + 1 < START_TIMES.length &&
        START_TIMES[q + 1] < currTimeMilli
    )
        q += 1;
    if (q < QUARTERS.length && q < START_TIMES.length) {
        state.quarterStart = START_TIMES[q];
        state.quarter = QUARTERS[q];
        state.quarterIndex = q;
    } else {
        return Promise.reject(
            new RangeError(
                "An error has occurred in our system. Please raise issue 'INVALID QUARTER' on the page github - https://github.com/ACM-UCI/ACM-UCI-Website"
            )
        );
    }

    // Determine Board Quarter --------------------------------------------------------------
    //  This is the the quarter which board memebers can set problems for
    q = 0;
    while (
        q < QUARTERS.length &&
        q < BOARD_QUARTERS.length &&
        BOARD_QUARTERS[q] < currTimeMilli
    ) {
        q += 1;
    }

    q -= 1;
    state.boardQuarterInd = q;
    state.boardQuarter = QUARTERS[q];

    // Determine Week of the Quarter ---------------------------------------------------------
    state.week = (
        (currTimeMilli - state.quarterStart) / 1000 / 60 / 60 / 24 / 7 +
        0.5
    ).toFixed(0);
    state.week = Math.min(state.week, 11);

    // The following code handles what is displayed in between quarters
    if (state.week === 11) {
        if (state.quarterIndex < QUARTERS.length - 1) {
            state.week = 0;
            state.quarterIndex += 1;
            state.quarter = QUARTERS[state.quarterIndex];
        }
        if (state.boardQuarterInd < QUARTERS.length - 1) {
            // Automatically allows board to add problems for next quarter if in between quarters
            state.boardQuarterInd += 1;
            state.boardQuarter = QUARTERS[state.boardQuarterInd];
        }
    }

    // Determine Session of Week -------------------------------------------------------------
    // 604800000 milliseconds in a week
    const weekTimeElapsed = (currTimeMilli - state.quarterStart) % 604800000;

    let i = 0;
    while (
        i < MEETINGS.length &&
        MEETINGS[i].determineState(weekTimeElapsed) === Meeting.STATE_ENDED()
    )
        i += 1;

    if (i >= MEETINGS.length) {
        state.session = MEETINGS.length + 1; // Must do +1 because of 1-based indexing in Week.js
        state.currentSessionOver = true;
    } else if (
        MEETINGS[i].determineState(weekTimeElapsed) === Meeting.STATE_PRIOR()
    ) {
        // Sets it to previous session and flags it as complete, will not show current session
        state.session = i;
        state.currentSessionOver = true;
    } else {
        state.session = i + 1; // Must do +1 because of 1-based indexing in Week.js
        state.currentSessionOver = false;
    }

    state.initialized = true;
    return state;
}

/**
 * Makes a request to external world clock api to get current time in Pacific
 *  Daylight Time. (TODO - need to add this functionality)
 * Returns a Promise whose then clause takes a one argument callback function
 *  where the argument is the current time Date object.
 */
export async function initializeSchedule() {
    const data = {
        datetime: Date.now(),
    };
    return computeSchedule(data).then((st) => st);
}

/**
 * Can be used to check if the schedule has been configured properly.
 */
export function isInitialized() {
    return state.initialized;
}

// Accessor functions
/**
 * Returns a string representation the current year that can be used to access
 * boardMembers.json as well as the logs in the firebase database.
 *
 * Example form: '2019-2020'
 */
export function getConfiguredYear() {
    return config.current;
}

/**
 * Returns a list of all years for which board members are kept track off
 */
export function getConfiguredYearList() {
    return config.yearList;
}
