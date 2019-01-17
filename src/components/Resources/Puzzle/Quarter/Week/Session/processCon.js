import acm from '../../../../../../acm_logo.svg';
import karthik from '../../../../../../img/karthik.jpg';
import blakePooya from '../../../../../../img/blake-pooya.jpg';
import chinmay from '../../../../../../img/chinmay.jpg';
import jens from '../../../../../../img/jens.jpg';
import bryon from '../../../../../../img/bryon.jpg';
import jacky from '../../../../../../img/jacky.jpg';
import meta from '../../../../../../img/meta.jpg';

export default function processLink(link) {
    const fb = ['https://www.facebook.com/groups/acmuci/', acm];
    if (link.endsWith('Karthik')) {
        return ['https://www.facebook.com/karthik.gajulapalli.7', karthik];
    }
    if (link.endsWith('Chinmay')) {
        return ['https://www.facebook.com/sauercraut', chinmay];
    }
    if (link.endsWith('Pooya')) {
        return ['https://www.facebook.com/khosravipooya', blakePooya];
    }
    if (link.endsWith('Bryon')) {
        return ['https://www.facebook.com/btjanaka', bryon];
    }
    if (link.endsWith('Jens')) {
        return ['https://www.facebook.com/jens.tuyls', jens];
    }
    if (link.endsWith('Blake')) {
        return ['https://www.facebook.com/blake.wakasa', blakePooya];
    }
    if (link.endsWith('Jacky')) {
        return [
            'https://www.facebook.com/profile.php?id=100007416798455',
            jacky
        ];
    }
    if (link.endsWith('Chris')) {
        return ['https://www.facebook.com/christopher.chu.35', acm];
    }
    if (link.endsWith('Meta')) {
        return ['https://www.facebook.com/meta.novitia', meta];
    }
    if (link.endsWith('Frank')) {
        return ['https://www.facebook.com/profile.php?id=100012887927941', acm];
    }
    if (link.endsWith('Tim')) {
        return ['https://www.facebook.com/blazedspeeder', acm];
    }
    if (link.endsWith('Junlin')) {
        return ['https://www.facebook.com/jack.wang.315080', acm];
    }
    if (link.endsWith('Armen')) {
        return ['https://www.facebook.com/amouradyan', acm];
    }
    return fb;
}
