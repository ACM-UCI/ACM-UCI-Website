import acm from "../../../../../../acm_logo.svg";
import karthik from '../../../../../../img/karthik.jpg';
import blakePooya from '../../../../../../img/blake-pooya.jpg';
import chinmay from '../../../../../../img/chinmay.jpg';
import jens from '../../../../../../img/jens.jpg';
import bryon from '../../../../../../img/bryon.jpg'
import jacky from '../../../../../../img/jacky.jpg';
import meta from '../../../../../../img/meta.jpg';

export default function processLink(link){
    var fb=["https://www.facebook.com/groups/acmuci/",acm];
    if(link.endsWith("Karthik")){
        return ["https://www.facebook.com/karthik.gajulapalli.7",karthik];
    }else if(link.endsWith("Chinmay")){
        return ["https://www.facebook.com/sauercraut",chinmay];
    }else if(link.endsWith("Pooya")){
        return ["https://www.facebook.com/khosravipooya",blakePooya];
    }else if(link.endsWith("Bryon")){
        return ["https://www.facebook.com/btjanaka",bryon];
    }else if(link.endsWith("Jens")){
        return ["https://www.facebook.com/jens.tuyls",jens];
    }else if(link.endsWith("Blake")){
        return ["https://www.facebook.com/blake.wakasa",blakePooya];
    }else if(link.endsWith("Jacky")){
        return ["https://www.facebook.com/profile.php?id=100007416798455",jacky];
    }else if(link.endsWith("Chris")){
        return ["https://www.facebook.com/christopher.chu.35",acm];
    }else if(link.endsWith("Meta")){
        return ["https://www.facebook.com/meta.novitia",meta];
    }else if(link.endsWith("Frank")){
        return ["https://www.facebook.com/profile.php?id=100012887927941",acm];
    }else if(link.endsWith("Tim")){
        return ["https://www.facebook.com/blazedspeeder",acm];
    }else if(link.endsWith("Junlin")){
        return ["https://www.facebook.com/jack.wang.315080",acm];
    }else if(link.endsWith("Armen")){
        return ["https://www.facebook.com/amouradyan",acm];
    }
    return fb;
}