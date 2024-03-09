import { BaseEntity } from 'typeorm';
export declare class entitiproperty_ids_expanded extends BaseEntity {
    id_property_ids_expanded: number;
    id: string;
    property_ids_expanded: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
