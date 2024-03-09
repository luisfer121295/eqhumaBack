export interface Response {
    hotelInfo: HotelInfo;
    minPrice: number;
    rateDetails: RateDetails;
}

export interface HotelInfo {
    hotelCode: number;
    hotelName: string;
    hotelAddress: string;
    hotelPictureUrl: string;
    longitude: string;
    latitude: string;
    starRating: number;
}

export interface RateDetails {
    rateDetails: RateDetail[];
    minRate: number;
    maxRate: number;
}

export interface RateDetail {
    rateDetailCode: string;
    rooms: Rooms;
    totalPrice: number;
    tax: number;
    remarks: string;
    taxesAndFees: Tax[];
    cancelPoliciesInfos: CancelPolicyInfos;
}

export interface Rooms {
    rooms: Room[];
}

export interface Room {
    roomCode: string;
    adultCount: number;
    childCount: number;
    boards: Board[];
    includedBoard: IncludedBoard;
    roomDescription: string;
    roomRemarks: string;
    roomRate: RoomRate;
}

export interface Board {
    // You can define board properties here if needed
}

export interface IncludedBoard {
    boardId: string;
    boardDescription: string;
    price: number;
}

export interface RoomRate {
    initialPrice: number;
    price: number;
    initialPricePerNight: number[];
    pricePerNight: number[];
}

export interface Tax {
    included: boolean;
    description: string;
    amount: number;
    currency: string;
}

export interface CancelPolicyInfos {
    cancelPolicyInfos: CancelPolicyInfo[];
    hotelRemarks: any[]; // You can define a type for this if needed
    cancellationPolicies: any[]; // You can define a type for this if needed
    refundableTag: string;
}

export interface CancelPolicyInfo {
    cancelTime: string;
    amount: number;
    type: string;
}
