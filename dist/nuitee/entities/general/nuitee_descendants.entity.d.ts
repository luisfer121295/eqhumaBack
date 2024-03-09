import { BaseEntity } from 'typeorm';
export declare class entitidescendants extends BaseEntity {
    _province_state: number;
    id: string;
    province_state: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
