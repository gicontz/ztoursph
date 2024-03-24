import { Action } from '@app/types/Action';

export enum Actions {
    ADD_TO_TRIPS = '@trips/ADD_TO_TRIPS',
    REMOVE_TO_TRIPS = '@trips/REMOVE_TO_TRIPS',
    GET_TRIPS = '@trips/GET_TRIPS',
    SET_PAX_TO_TRIPS = '@trips/SET_PAX_TO_TRIPS',
    SET_LOADING = '@trips/SET_LOADING',
};

export type TCategory = 'tours' | 'packages';

export type TTrip = {
    tripId: string | number;
    title: string;
    thumbnail: string;
    date: string;
    participants: Array<string>;
    numberOfTraveller: number;
    location: string;
    category: TCategory;
}

export interface TripsState {
    trips: TTrip[];
    isLoading?: boolean;
};

export type AddToTrips = Action<typeof Actions.ADD_TO_TRIPS, TTrip>;
export type RemoveToTrips = Action<typeof Actions.REMOVE_TO_TRIPS, string | number>;
export type GetTrips = Action<typeof Actions.GET_TRIPS, TTrip[]>;

export type SetLoadingAction = Action<typeof Actions.SET_LOADING, boolean>;
export type SetPaxToTripsAction = Action<typeof Actions.SET_PAX_TO_TRIPS, { id: string | number, pax: number }>;

export type TripsTypes = 
    | AddToTrips
    | RemoveToTrips
    | GetTrips
    | SetLoadingAction
    | SetPaxToTripsAction;