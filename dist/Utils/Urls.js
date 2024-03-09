"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlproviders = exports.GetPaswordlogitix = exports.GetUrlLogitix = void 0;
function GetUrlLogitix(enviroment) {
    if (enviroment == 0) {
        return 'https://api.preview.autoprocessor.com/V03';
    }
    else {
        return 'https://api.autoprocessor.com/V03';
    }
}
exports.GetUrlLogitix = GetUrlLogitix;
function GetPaswordlogitix(enviroment) {
    if (enviroment == 0) {
        return 'IMCpW-{Qe|';
    }
    else {
        return 'DJAH[O3W9-';
    }
}
exports.GetPaswordlogitix = GetPaswordlogitix;
function urlproviders(enviroment) {
    if (enviroment == 0) {
        return 'http://ws.nuitee.com/nuitee/2.0/content/hotelInfo';
    }
    else if (enviroment == 1) {
        return 'https://api.makcorps.com/mapping?api_key=65a775f34bdc1a8110980186&name=';
    }
}
exports.urlproviders = urlproviders;
//# sourceMappingURL=Urls.js.map