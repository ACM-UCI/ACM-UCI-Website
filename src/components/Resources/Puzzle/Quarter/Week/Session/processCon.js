import acm from '../../../../../../acm_logo.svg';
import karthik from '../../../../../../img/karthik.jpg';
import blakePooya from '../../../../../../img/blake.jpg';
import chinmay from '../../../../../../img/chinmay.jpg';
import jens from '../../../../../../img/jens.jpg';
import bryon from '../../../../../../img/bryon.jpg';
import jacky from '../../../../../../img/jacky.jpg';
import meta from '../../../../../../img/meta.jpg';
import frank from '../../../../../../img/frank.jpg';
import tim from '../../../../../../img/tim.jpg';
import armen from '../../../../../../img/armen.jpg';
import junlin from '../../../../../../img/junlin.jpg';
import arne from '../../../../../../img/arne.jpg';
import chris from '../../../../../../img/chris.jpg';

export default function processLink(link) {
    const fb = ['https://www.facebook.com/groups/acmuci/', acm];
    if (link === 'kgajulap') {
        return ['https://www.facebook.com/karthik.gajulapalli.7', karthik];
    }
    if (link === 'craut') {
        return ['https://www.facebook.com/sauercraut', chinmay];
    }
    if (link === 'pooyak') {
        return ['https://www.facebook.com/khosravipooya', blakePooya];
    }
    if (link === 'btjanaka') {
        return ['https://www.facebook.com/btjanaka', bryon];
    }
    if (link === 'jtuyls') {
        return ['https://www.facebook.com/jens.tuyls', jens];
    }
    if (link === 'bwakasa') {
        return ['https://www.facebook.com/blake.wakasa', blakePooya];
    }
    if (link === 'renjied') {
        return [
            'https://www.facebook.com/profile.php?id=100007416798455',
            jacky
        ];
    }
    if (link === 'cdipalma') {
        return ['https://www.facebook.com/christopher.chu.35', chris];
    }
    if (link === 'mnovitia') {
        return ['https://www.facebook.com/meta.novitia', meta];
    }
    if (link === 'zhonghas') {
        return [
            'https://www.facebook.com/profile.php?id=100012887927941',
            frank
        ];
    }
    if (link === 'timothy4') {
        return ['https://www.facebook.com/blazedspeeder', tim];
    }
    if (link === 'junliw1') {
        return ['https://www.facebook.com/jack.wang.315080', junlin];
    }
    if (link === 'amourady') {
        return ['https://www.facebook.com/amouradyan', armen];
    }
    if (link === 'aphilipe') {
        return ['https://www.facebook.com/arne.philipeit', arne];
    }
    return fb;
}
