export interface Response {
    responseStatus: ResponseStatus;
    hotelId: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
    airportCode: string;
    propertyCategory: number;
    propertyCurrency: string;
    propertyCategoryName: string;
    starRating: string;
    supplierType: string;
    location: string;
    highRate: string;
    lowRate: string;
    checkInTime: string;
    checkOutTime: string;
    cityCode: number;
    hotelDescription: string;
    hotelDiningDescription: string;
    hotelAttraction: string;
    hotelLocationDescription: string;
    hotelFeatures: string;
    hotelAmenitiesDescription: string;
    roomInfos: roomInfos[]; // You can define a type for this if needed
    hotelAttributeses: string[];
    hotelImages: HotelImage[];
}

export interface ResponseStatus {
    statusCode: string;
    requestAt: string;
    responseAt: string;
    statusMessage: string;
}

export interface HotelImage {
    url: string;
    thumbnailUrl: string;
    caption: string | null;
    order: number | null;
    defaultImage: boolean;
}

export interface roomInfos {
    roomCode: string;
    roomName: string;
}
