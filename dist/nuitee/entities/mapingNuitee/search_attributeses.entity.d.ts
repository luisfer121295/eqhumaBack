import { BaseEntity } from 'typeorm';
export declare class entitiAtributes extends BaseEntity {
    id_inforooms: number;
    hotelId: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    hotelAttributeses: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
