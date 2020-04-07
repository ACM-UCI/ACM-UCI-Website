import config, { Meeting } from '../components/config.js';

const START_TIMES = config.dates;
const QUARTERS = config.quarters;
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
    currentSessionOver: false
};

/**
 * Makes a request to external world clock api to get current time in Pacific Daylight Time.
 * Returns a Promise whose then clause takes a one argument callback function where the argument is the current time Date object.
 */
export async function initializeSchedule() {
    return await fetch(
        'http://worldtimeapi.org/api/timezone/America/Los_Angeles'
    )
        .then(response => {
            return response.json();
        })
        .then(data => {
            state.datetime = new Date(data.datetime);

            // state.datetime = new Date('April 7, 2020 08:00:00'); // Use for testing
            // Verify time is valid ------------------------------------------------------------------
            if (
                !(state.datetime instanceof Date) ||
                isNaN(state.datetime.getTime())
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
                ++q;
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

            // Determine Week of the Quarter ---------------------------------------------------------
            state.week = (
                (currTimeMilli - state.quarterStart) / 1000 / 60 / 60 / 24 / 7 +
                0.5
            ).toFixed(0);

            // Determine Session of Week -------------------------------------------------------------
            const weekTimeElapsed =
                (currTimeMilli - state.quarterStart) % 604800000; // 604800000 milliseconds in a week

            let i = 0;
            while (
                i < MEETINGS.length &&
                MEETINGS[i].determineState(weekTimeElapsed) ===
                    Meeting.STATE_ENDED()
            )
                ++i;

            if (i >= MEETINGS.length) {
                state.session = MEETINGS.length + 1; // Must do +1 because of 1-based indexing in Week.js
                state.currentSessionOver = true;
            } else {
                if (
                    MEETINGS[i].determineState(weekTimeElapsed) ===
                    Meeting.STATE_PRIOR()
                ) {
                    state.session = i; // Sets it to previous session and flags it as complete, will not show current session
                    state.currentSessionOver = true;
                } else {
                    state.session = i + 1; // Must do +1 because of 1-based indexing in Week.js
                    state.currentSessionOver = false;
                }
            }

            state.initialized = true;
            return state;
        });
}

/**
 * Can be used to check if the schedule has been configured properly.
 */
export function isInitialized() {
    return state.initialized;
}
