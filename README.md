# ACM @ UCI Website ###

## Deployment
* Deployed with Travis CI github pages
* This repo is compiled by Travis CI and the result is pushed to [ACM-UCI.github.io](https://github.com/ACM-UCI/ACM-UCI.github.io)

## New Quarter Checklist
### src/components/config.js
* [ ] If new school year, add new year to `yearList` and update `current`
* [ ] Add new `Meeting` array to `meetings` with the weekly schedule
    * See comments for the `Meeting` class
* [ ] Add new quarter to `quarters`
* [ ] Add new quarter start date to `dates`
* [ ] Add new Date for which board access for the quarter begins
  * This is the date which the board can begin setting problems for the upcoming quarter

### src/components/Home/Home.js
* Update `Card` components in the `cards` array
  * [ ] Set the next 'Upcoming Major Event' to the first meeting of the quarter
  * [ ] Update 'Meeting Times' to reflect quarter schedule

### src/components/Board/index.js
* [ ] If new school year, add any new board members with their photos to the board
### src/components/Board/board.json
* [ ] If new school year, update new board
