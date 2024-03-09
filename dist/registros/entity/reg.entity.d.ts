import { BaseEntity } from "typeorm";
export declare class entitiregs extends BaseEntity {
    id_rclient: number;
    registros1: string;
    sectiontype: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
