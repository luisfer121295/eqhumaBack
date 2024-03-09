import { BaseEntity } from 'typeorm';
export declare class entitiroomsinfo extends BaseEntity {
    id_roomsinfohotel: number;
    hotelid: number;
    name: string;
    roomcode: string;
    roomname: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
