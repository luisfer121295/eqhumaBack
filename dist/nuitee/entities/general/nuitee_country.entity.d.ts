import { BaseEntity } from 'typeorm';
export declare class entitiCountry extends BaseEntity {
    id_country: number;
    id: string;
    type: string;
    name: string;
    name_full: string;
    country_code: string;
    coordinates: string;
    associations: string;
    ancestors: string;
    descendants: string;
    property_ids_expanded: string;
    property_ids: string;
    categories: string;
    tags: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
