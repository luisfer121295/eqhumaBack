import { BaseEntity } from 'typeorm';
export declare class entitiMachInfoHotels extends BaseEntity {
    id_machinfo: number;
    nuitee_hotelid: number;
    nuitee_name: string;
    nuitee_address1: string;
    nuitee_address2: string;
    nuitee_city: string;
    nuitee_citycode: number;
    nuitee_stateprovince: string;
    nuitee_latitude: string;
    nuitee_longitude: string;
    markcorps_hotelid: number;
    markcorps_name: string;
    markcorps_address1: string;
    markcorps_city: string;
    markcorps_citycode: number;
    markcorps_latitude: string;
    markcorps_longitude: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
    flag_type: number;
    flag_name: number;
    flag_addresasc: number;
    flag_addresdesc: number;
    flag_coords: number;
}
