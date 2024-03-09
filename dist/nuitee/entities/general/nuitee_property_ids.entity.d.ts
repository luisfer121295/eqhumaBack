import { BaseEntity } from 'typeorm';
export declare class entitiproperty_ids extends BaseEntity {
    id_property_ids: number;
    id: string;
    property_ids: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
