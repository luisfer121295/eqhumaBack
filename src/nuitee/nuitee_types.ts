// Interfaces para las tablas

interface Country {
    id_country: number;
    id: string;
    type: string;
    name: string;
    name_full: string;
    country_code: string;
    coordinates_id: number;
    associations_id: string;
    ancestors_id: number;
    descendants_id: number;
    property_ids_expanded_id: number;
    property_ids_id: number;
    categories_id: number;
    tags_id: number;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Coordinates {
    id_coordinates: number;
    id: string;
    center_longitude: string;
    center_latitude: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface PointOfInterest {
    id_point_of_interest: number;
    id: string;
    name: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Continent {
    id_continent: number;
    id_country: string;
    id: string;
    type: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Descendants {
    ID_province_state: number;
    id: string;
    province_state: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface PropertyIdsExpanded {
    id_property_ids_expanded: number;
    id: string;
    property_ids_expanded: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface PropertyIds {
    id_property_ids: number;
    id: string;
    property_ids: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Categories {
    id_categories: number;
    id: string;
    categories: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Tags {
    id_tags: number;
    id: string;
    tags: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface proces3type {
    typesearch: number; 
    textsearch: string;
    quantity: number;
}