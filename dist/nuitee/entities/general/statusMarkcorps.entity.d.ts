import { BaseEntity } from 'typeorm';
export declare class entitiMachInfoHotels extends BaseEntity {
    id_markcorpsstatus: number;
    id_machinfo: number;
    namehotelsearch: string;
    statusCode: string;
    requestAt: string;
    responseAt: string;
    statusMessage: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
