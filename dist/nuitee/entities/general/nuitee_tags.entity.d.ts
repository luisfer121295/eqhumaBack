import { BaseEntity } from 'typeorm';
export declare class entititags extends BaseEntity {
    id_tags: number;
    id: string;
    tags: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
