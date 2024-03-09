interface Coordinates {
    center_longitude: number;
    center_latitude: number;
}
interface Associations {
    point_of_interest: string[];
}
interface Ancestor {
    id: string;
    type: string;
}
interface Descendants {
    province_state: string[];
}
export interface Country {
    id: string;
    type: string;
    name: string;
    name_full: string;
    country_code: string;
    coordinates: Coordinates;
    associations: Associations;
    ancestors: Ancestor[];
    descendants: Descendants;
    property_ids_expanded: string[];
    property_ids: string[];
    categories: string[];
    tags: string[];
}
export declare class CountryService {
    private filePath;
    constructor(filePath: string);
    private readLargeFile;
    private parseJsonLines;
    getCountOfElements(): Promise<any>;
}
export {};
