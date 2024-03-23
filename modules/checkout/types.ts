import { TCategory } from "../trips/types";

export type TBooking = {
    id: string | number;
    pax: number;
    category?: TCategory;
}

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
}