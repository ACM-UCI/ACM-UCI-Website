# ACM @ UCI Website ###

## Solutions Page
### LAYOUT
- Below the banner is the key that indicates what each card color mean
- Next is the latest problemset/solutions/events
- Then there are tabs of past problemsets/solutions/events since Fall 2018
### MECHANISMS
1. Quarter Start (first day of club meeting 1 hour before start time)
    * PRESENT
        -  Week 1 Session 1 Problemset updates
        -  Will not show solutions, will instead tell them to get help from contributor
    * PAST
        - Previous Quarter's Week 11 Session 2 will be added
        - New Quarter's tab will be added to 'Past' (empty)
        - Active quarter tab will be new quarter
2. After Meeting Ends
    * PRESENT
        - Week 1 Session 1 Solutions updates
3. Next Meeting Starts
    * PRESENT
        - Next Week/Session Problemset Updates
        - Will not show solutions, will instead tell them to get help from contributor
    * PAST
         - Last Week/Session will be added
    *Cycle to number 2 until Week 11 Session 2 ends*
4. After Week 11 Session 2 ends
    * PRESENT
        - Stays at Week 11 Session 2 until next quarter starts
    *Cycle to number 1*

## Uploading Solution
There are only 2 steps to add problemsets to the website:
1. Add solutions to folder in the correct quarter and week inside public/solutions
2. Fill in the csv file in the proper quarter and week inside public including:
    * Name          : problem name, please make it short and identifiable
    * Link          : full link to the problem (*see note_1*)
    * Difficulty    : 'easy', 'med', 'hard', 'icpc' or 'codealong' (*see note_2!*)
    * Solution      : name of solution file, w/out path, w/ file type (*see note_1*)
    * Session       : session when the problem is posted on (*see note_3*)

* note_1: 
    If no link or no solution provided, will give photo and FB link
    of board member who contributed the problem. If no contributor
    assigned, then will give ACM logo and link to ACM page.
* note_2:
    There are extra tags (such as 'event' and 'finals') that are 
    special, and will not provide the solution button. Only those
    listed in the steps will provide a solution button. To add new
    tags, you will need to add to 2 files (Puzzle and Problem).
* note_3:
    If the problem is reused within the week, please set it to 
    the last session it is used on.

## WARNINGS
1. Assumed that the club's first week of meeting is UCI's Week 1 of each quarter (hard-coded)
2. Assumed that the length of each meeting is 2 hours
3. Assumed that contributers are board members, some may not have pictures
4. Solutions must be within proper week as specified in the CSVs
5. TIMEZONES MAY CAUSE BUGS, may have to recheck daylight saving times
6. Supports only python and c++ solutions :)), may add more if needed
7. Not much error handling done :')