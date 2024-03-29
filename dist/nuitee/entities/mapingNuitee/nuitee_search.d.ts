import { BaseEntity } from 'typeorm';
export declare class entitiSearchPR extends BaseEntity {
    id_searchhotel: number;
    hotelid: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    stateprovince: string;
    postalcode: string;
    country: string;
    latitude: string;
    longitude: string;
    airportcode: string;
    propertycategory: number;
    propertycurrency: string;
    propertycategoryname: string;
    starrating: string;
    confidence: number;
    suppliertype: string;
    location: string;
    chaincodeid: string;
    highrate: string;
    lowrate: string;
    checkintime: string;
    checkouttime: string;
    citycode: number;
    hoteldescription: string;
    hoteldiningdescription: string;
    hotelattraction: string;
    hotellocationdescription: string;
    hotelfeatures: string;
    hotelamenitiesdescription: string;
    roominfos: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
