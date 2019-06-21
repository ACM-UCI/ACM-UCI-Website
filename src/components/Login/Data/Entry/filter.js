export default function filter(problem, filters) {
    if (
        ((filters.diffs === 'Difficulty' &&
            (problem.Difficulty === 'easy' ||
                problem.Difficulty === 'med' ||
                problem.Difficulty === 'hard' ||
                problem.Difficulty === 'codealong' ||
                problem.Difficulty === 'icpc')) ||
            filters.diffs === problem.Difficulty) &&
        (filters.solf === 'Solution' ||
            (filters.solf === 'No Solution' && problem.Code === '') ||
            (filters.solf === 'Has Solution' && problem.Code !== '')) &&
        (filters.cons === 'Contributor' ||
            (problem.Contributor !== undefined &&
                problem.Contributor.indexOf(filters.cons) !== -1)) &&
        (filters.sess === 'Session' ||
            (filters.sess === 'Not Used' && problem.Session === undefined) ||
            (problem.Session !== undefined &&
                problem.Session.indexOf(filters.sess) !== -1)) &&
        (filters.note === 'Notes' ||
            (filters.note === 'No Notes' && problem.Note === '') ||
            (filters.note === 'Has Notes' && problem.Note !== ''))
    ) {
        return 1;
    }
    return 0;
}
