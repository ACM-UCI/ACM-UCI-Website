import { useState } from 'react';
import config from '../../config.js';

const difficultyTags = {
    difficulties: ['easy', 'med', 'hard', 'icpc', 'codealong', 'presentation'],
    extras: ['event', 'announcement', 'finals', 'thanksgiving', 'poll']
};

export default function Submit(props) {
    const { quarter, week, owner } = props;

    const [loaded, setLoaded] = useState(false);
}
