export default function filter(problem, filters) {
    if (
        ((filters.diff === 'All' &&
            (problem.Difficulty === 'easy' ||
                problem.Difficulty === 'med' ||
                problem.Difficulty === 'hard' ||
                problem.Difficulty === 'codealong' ||
                problem.Difficulty === 'icpc')) ||
            filters.diff === problem.Difficulty) &&
        (filters.solf === 'All' ||
            (filters.solf === 'No Solution' && problem.Code === '') ||
            (filters.solf === 'Has Solution' && problem.Code !== '')) &&
        (filters.cons === 'All' ||
            (problem.Contributor !== undefined &&
                problem.Contributor.indexOf(filters.cons) !== -1)) &&
        (filters.sess === 'All' ||
            (filters.sess === 'Not Used' && problem.Session === undefined) ||
            (problem.Session !== undefined &&
                problem.Session.indexOf(filters.sess) !== -1)) &&
        (filters.note === 'All' ||
            (filters.note === 'No Notes' && problem.Note === '') ||
            (filters.note === 'Has Notes' && problem.Note !== '')) &&
        (filters.cate === 'All' ||
            (problem.Category !== undefined &&
                problem.Category.indexOf(filters.cate) !== -1))
    ) {
        return 1;
    }
    return 0;
}
