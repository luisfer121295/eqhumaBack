import { BaseEntity } from 'typeorm';
export declare class entiticategories extends BaseEntity {
    id_categories: number;
    id: string;
    categories: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
