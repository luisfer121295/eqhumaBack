import { Repository } from "typeorm";
import { entitiregs } from './entity/reg.entity';
import { regtype } from './reg_types';
export declare class registerservice {
    private readonly setinforeg;
    constructor(setinforeg: Repository<entitiregs>);
    CodeInfo(code: any): Promise<entitiregs[]>;
    insertreg(regtype: regtype): Promise<entitiregs>;
}
