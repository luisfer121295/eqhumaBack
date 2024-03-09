import { BaseEntity } from 'typeorm';
export declare class entitiCoordinates extends BaseEntity {
    id_coordinates: number;
    id: string;
    center_longitude: string;
    center_latitude: string;
    availeable: boolean;
    create_at: Date;
    update_at: Date;
    updateTimestamps(): void;
}
