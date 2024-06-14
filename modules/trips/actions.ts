import { Dispatch, useReducer } from "react";
import { Actions, TripsState, TripsTypes, TTrip } from "./types";
import { trips } from "./reducer";
import { defaultState } from "@providers/trips";

export const useTrips = (): [TripsState, React.Dispatch<TripsTypes>] => {
    const [state, dispatch] = useReducer(trips, defaultState.tripStore);
    return [state, dispatch];
};

export const addToTrips = (dispatch: Dispatch<TripsTypes>, trip: TTrip) => {
    dispatch({ type: Actions.ADD_TO_TRIPS, payload: trip });
}

export const removeToTrips = (dispatch: Dispatch<TripsTypes>, tripIndex: number) => {
    dispatch({ type: Actions.REMOVE_TO_TRIPS, payload: tripIndex });
}

export const getTrips = (dispatch: Dispatch<TripsTypes>, trips: TTrip[]) => {
    dispatch({ type: Actions.GET_TRIPS, payload: trips });
}

export const setLoading = (dispatch: Dispatch<TripsTypes>, isLoading: boolean) => {
    dispatch({ type: Actions.SET_LOADING, payload: isLoading });
}

export const setPaxToTrips = (dispatch: Dispatch<TripsTypes>, data: { id: string | number; pax: number }) => {
    dispatch({ type: Actions.SET_PAX_TO_TRIPS, payload: data });
}