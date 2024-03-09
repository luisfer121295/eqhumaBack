import { BaseEntity } from 'typeorm';
export declare class entitiStatus extends BaseEntity {
    id_searchstatus: number;
    hotelid: number;
    statuscode: string;
    a: any;
    requestat: string;
    responseat: string;
    statusmessage: string;
    flag_provider: number;
    urlapi: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
