import { BaseEntity } from 'typeorm';
export declare class entitiHotelImages extends BaseEntity {
    id_hotelimages: number;
    hotelid: number;
    name: string;
    url: string;
    thumbnailurl: string;
    caption: string;
    ordern: string;
    defaultimage: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
