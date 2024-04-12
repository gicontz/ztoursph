import { TGuest } from "@components/checkout/guest";
import { TCategory } from "../trips/types";

export type TBooking = {
    id: string | number;
    pax: number;
    ages: number[];
    category?: TCategory;
};

export type TBookedTour = {
    id: string | number;
    pax: number;
    category?: TCategory;
    date: string;
    pickup_time: string;
    description: string;
    subtotal: string;
};

export type TPreCheckout = {
    booking: TBooking[];
};

export type TPreCheckoutCalculation = {
    subTotals: Array<{
        id: string;
        pax: number;
        subTotal: number;
    }>;
    totalAmt: number;
    processingFee: number;
    totalAmtTbp: number;
};

export type TGuestItinerary = {
    name: string;
    age: number
    nationality: string;
};

export type TItinerary = {
    firstName: string;
    lastName: string;
    middleInitial: string;
    email: string;
    mobileNumber1: string;
    mobileNumber2: string;
    age: number;
    sex: string;
    booking_date: string;
    guests: Array<TGuestItinerary>;
    booked_tours: Array<TBookedTour>;
};

export type TCheckoutParticipant = {
    name: string;
    age: number;
    nationality: string;
};

export type TCheckoutTrips = {
    userEmail: string;
    first_name: string;
    middle_init: string;
    last_name: string;
    packages: {
        id: string | number;
        pax: number;
        date: string;
        participants: TCheckoutParticipant[];
    }[]
};

export type TCreateBooking = {
    userEmail: string;
    first_name: string;
    middle_init: string;
    last_name: string;
    packages: {
        id: string | number;
        pax: number;
        date: string;
        participants: TCheckoutParticipant[];
    }[]
};

export type TPaymentData = {
    userId: string;
    bookingId: string;
    amount: number;
    status: string;
    paymentType: string;
    success_response?: string;
    failed_response?: string;
    redirectUrl?: {
        success: string;
        failed: string;
        cancel: string
    }
}