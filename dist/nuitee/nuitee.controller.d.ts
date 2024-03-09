import { NuiteeService } from "./nuitee.service";
import { proces3type } from "./nuitee_types";
export declare class NuiteeController {
    private CodesListService;
    constructor(CodesListService: NuiteeService);
    validcode(code: any): Promise<any[]>;
    updatecode(idcode: any, idusuario: any): Promise<any[]>;
    datanuitee(data: any): Promise<any>;
    readnuitee(data: any): Promise<any>;
    divfile(data: any): Promise<any>;
    valididnuitee(data: any): Promise<any>;
    SearchHotelNitee(request: {
        tipesearch: number;
        textsearch: string;
        quantity: number;
    }, query: {
        counter?: number;
    }): Promise<any>;
    SearchHotelMarkcorps(data: any): Promise<any>;
    SearchHotels(request: {
        amount: number;
    }, query: {
        counter?: number;
    }): Promise<any>;
    MapingMarkcorps(procestype: proces3type, query: {
        counter?: number;
    }): Promise<any>;
}
