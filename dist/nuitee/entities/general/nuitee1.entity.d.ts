import { BaseEntity } from 'typeorm';
export declare class infojsonNuitee extends BaseEntity {
    id_code: number;
    codename: string;
    idcreador: number;
    available: boolean;
    idpromotion: number;
    typediscount: number;
    amount: number;
    created_at: Date;
    idusuariocanje: number;
    fechacanje: Date;
    updateTimestamps(): void;
}
