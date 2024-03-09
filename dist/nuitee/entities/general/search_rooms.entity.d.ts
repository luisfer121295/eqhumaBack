import { BaseEntity } from 'typeorm';
export declare class entitiInfoRooms extends BaseEntity {
    id_inforooms: number;
    hotelid: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    roomcode: string;
    roomname: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
