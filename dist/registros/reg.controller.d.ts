import { registerservice } from "./reg.service";
import { regtype } from "./reg_types";
export declare class RegController {
    private CodesListService;
    constructor(CodesListService: registerservice);
    validreg(date: any): Promise<any[]>;
    SearchHotels(regtype: regtype, query: {
        counter?: number;
    }): Promise<any>;
}
