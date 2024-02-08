import { Action } from "@app/types/Action";

export enum Actions {
  GET_TOURS_START = '@tours/GET_TOURS_START',
  GET_TOURS_FULFILLED = '@tours/GET_TOURS_FULFILLED',
  GET_TOURS_FAILED = '@tours/GET_TOURS_FAILED',
  GET_TOUR_INFO_START = '@tours/GET_TOUR_INFO_START',
  GET_TOUR_INFO_FULFILLED = '@tours/GET_TOUR_INFO_FULFILLED',
  GET_TOUR_INFO_FAILED = '@tours/GET_TOUR_INFO_FAILED'
}

export type TTourResponse = {
  id: number;
  tour_slug: string;
  tour_title: string;
  tour_banner_image: string;
  package_details: string;
  thumbnail: string;
  price: number;
  discount: number;
  gallery: string[];
};

export type TToursResponse = {
  id: number;
  tour_slug: string;
  tour_title: string;
  package_details: string;
  price: number;
  discount: number;
  thumbnail: string;
  tour_banner_image: string;
  location: string;
  reviews: number;
  numberReviews: number;
  gallery: string[];
};

export interface ToursState {
  isLoading?: boolean;
  selectedTour: TTourResponse | null;
  tours: TToursResponse[];
  totalRecords: number;
}

export type GetToursRequest = Action<typeof Actions.GET_TOURS_START>;
export type GetToursAction = Action<typeof Actions.GET_TOURS_FULFILLED, { records: TToursResponse[]; totalRecords: number }>;
export type GetToursFailed = Action<typeof Actions.GET_TOURS_FAILED>;

export type GetTourInfoRequest = Action<typeof Actions.GET_TOUR_INFO_START>;
export type GetTourInfoAction = Action<typeof Actions.GET_TOUR_INFO_FULFILLED, TTourResponse>;
export type GetTourInfoFailed = Action<typeof Actions.GET_TOUR_INFO_FAILED>;

export type ToursTypes = 
  | GetToursRequest
  | GetToursAction
  | GetToursFailed
  | GetTourInfoRequest
  | GetTourInfoAction
  | GetTourInfoFailed;