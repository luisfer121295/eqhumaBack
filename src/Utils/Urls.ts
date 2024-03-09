export function GetUrlLogitix(enviroment: number) {
    //0 igual a test
    if (enviroment == 0) {
        return 'https://api.preview.autoprocessor.com/V03';
    } else {
        return 'https://api.autoprocessor.com/V03';
    }

}


export function GetPaswordlogitix(enviroment: number) {
    //0 igual a test
    if (enviroment == 0) {
        return 'IMCpW-{Qe|';
    } else {
        return 'DJAH[O3W9-';
    }

}

export function urlproviders(enviroment: number) {
    //0 igual a test
    if (enviroment == 0) {
        return 'http://ws.nuitee.com/nuitee/2.0/content/hotelInfo';
    } else if (enviroment == 1){
        return 'https://api.makcorps.com/mapping?api_key=65a775f34bdc1a8110980186&name=';
    }

}