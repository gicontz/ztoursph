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

export const removeToTrips = (dispatch: Dispatch<TripsTypes>, tripId: string) => {
    dispatch({ type: Actions.REMOVE_TO_TRIPS, payload: tripId });
}

export const getTrips = (dispatch: Dispatch<TripsTypes>, trips: TTrip[]) => {
    dispatch({ type: Actions.GET_TRIPS, payload: trips });
}