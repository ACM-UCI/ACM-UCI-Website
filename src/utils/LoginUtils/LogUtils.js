import board from '../../components/Board/board.json';

/**
 * Defines a helper class for tracking the 3 maximum values in a set.
 */
export class Max {
    constructor() {
        this.max = [0, 0, 0];
    }

    // Getters
    get gold() {
        return this.max[0];
    }
    get silver() {
        return this.max[1];
    }
    get bronze() {
        return this.max[2];
    }

    reset() {
        this.max = [0, 0, 0];
    }
    // Mutators
    update(potVal) {
        // Bubble value to correct postion
        if (potVal < this.max[2]) return;
        this.max[2] = potVal;

        if (this.max[2] > this.max[1]) {
            const temp = this.max[2];
            this.max[2] = this.max[1];
            this.max[1] = temp;
        } else {
            return;
        }

        if (this.max[1] > this.max[0]) {
            const temp = this.max[1];
            this.max[1] = this.max[0];
            this.max[0] = temp;
        }
    }
}

// Data for table rendering
const extcolumns = [
    { columnName: 'Name', width: 170 },
    { columnName: 'score', align: 'center' },
    { columnName: 'tot', align: 'center' }
];
const columns = [{ name: 'Name' }];

for (let i = 1; i <= 11; i++) {
    extcolumns.push({ columnName: i.toString(), width: 60 });
    columns.push({ name: i.toString() });
}

columns.push(
    { name: 'score', title: 'Board Score' },
    { name: 'tot', title: 'Total Score' }
);

export { extcolumns, columns };

// Enum Filters
export const filters = { ALL: 1, BOARD: 2, MEMBER: 3 };

/**
 * Returns a true if the member is included in the filter and should be rendered.
 * @param {string} member The string of the members name as represented in board.json
 * @param {year} string representing the year.
 * @param {int} filter An integer corresponding the enum filters.
 */
export function inFilter(member, year, filter) {
    switch (filter) {
        case filters.ALL:
            return true;
        case filters.BOARD:
            return board[year].hasOwnProperty(member);
        case filters.MEMBER:
            return !board[year].hasOwnProperty(member);
        default:
            return true;
    }
}
