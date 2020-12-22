/**
 * Uses the soundex algorithm to compute phonetic code
 */
function soundex(name) {
    if (name.trim().length === 0) return '';
    let s = [];
    let si = 1;
    let c;

    //              ABCDEFGHIJKLMNOPQRSTUVWXYZ
    let mappings = '01230120022455012623010202';

    s[0] = name[0].toUpperCase();

    for (let i = 1, l = name.length; i < l; i++) {
        c = name[i].toUpperCase().charCodeAt(0) - 65;

        if (c >= 0 && c <= 25) {
            if (mappings[c] !== '0') {
                if (mappings[c] !== s[si - 1]) {
                    s[si] = mappings[c];
                    si++;
                }

                if (si > 3) {
                    break;
                }
            }
        }
    }

    if (si <= 3) {
        while (si <= 3) {
            s[si] = '0';
            si++;
        }
    }

    return s.join('');
}

/**
 * Computes whether the search string is phonetically similar to the problem name
 * @param {String} a - Problem name
 * @param {String} b - Search string
 */
function computeMatch(a, b) {
    const aSplit = a.split(' ');
    const bSplit = b.split(' ');

    const aSoundex = aSplit.map(x => soundex(x));
    const bSoundex = bSplit.map(x => soundex(x));

    const hashed = new Set(aSoundex);

    return bSoundex.every(x => hashed.has(x)); // Every phonetic code of the search string
    // Must be found in the problem name
}

export default function filter(problem, filters) {
    var sess_names =
        problem && problem.Session
            ? problem.Session.map(v => v.Name)
            : undefined;
    if (
        ((filters.diff === 'All' &&
            (problem.Difficulty === 'easy' ||
                problem.Difficulty === 'med' ||
                problem.Difficulty === 'hard' ||
                problem.Difficulty === 'codealong' ||
                problem.Difficulty === 'icpc' ||
                problem.Difficulty === 'presentation')) ||
            filters.diff === problem.Difficulty) &&
        (filters.solf === 'All' ||
            (filters.solf === 'No Solution' && problem.Code === '') ||
            (filters.solf === 'Has Solution' && problem.Code !== '')) &&
        (filters.cons === 'All' ||
            (problem.Contributor !== undefined &&
                problem.Contributor.indexOf(filters.cons) !== -1)) &&
        (filters.sess === 'All' ||
            (filters.sess === 'Not Used' && sess_names === undefined) ||
            (sess_names !== undefined &&
                sess_names.indexOf(filters.sess) !== -1)) &&
        (filters.note === 'All' ||
            (filters.note === 'No Notes' && problem.Note === '') ||
            (filters.note === 'Has Notes' && problem.Note !== '')) &&
        (filters.cate === 'All' ||
            (problem.Category !== undefined &&
                problem.Category.indexOf(filters.cate) !== -1)) &&
        (filters.sear === undefined || computeMatch(problem.Name, filters.sear))
    ) {
        return 1;
    }
    return 0;
}
