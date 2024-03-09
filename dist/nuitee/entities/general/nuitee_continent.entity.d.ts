import { BaseEntity } from 'typeorm';
export declare class entiticontinent extends BaseEntity {
    id_continent: number;
    id_country: string;
    id: string;
    type: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
