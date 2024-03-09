import { BaseEntity } from 'typeorm';
export declare class entitipoint_of_interest extends BaseEntity {
    id_point_of_interest: number;
    id: string;
    name: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
