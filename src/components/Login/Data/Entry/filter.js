export default function filter(problem, q, filters) {
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
            filters.cons === problem.Contributor) &&
        (filters.sess === 'Session' ||
            (filters.sess === 'Not Used' && problem.Session === '') ||
            filters.sess === q) &&
        (filters.note === 'Notes' ||
            (filters.note === 'No Notes' && problem.Note === '') ||
            (filters.note === 'Has Notes' && problem.Note !== ''))
    ) {
        return 1;
    }
    return 0;
}
