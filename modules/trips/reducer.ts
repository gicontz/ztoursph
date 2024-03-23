import { Actions, TripsState, TripsTypes } from "./types";
import { defaultState } from '@app/providers/trips';

export const trips  = (state: TripsState = defaultState.tripStore, action: TripsTypes): TripsState => {
    switch(action.type) {
        case Actions.ADD_TO_TRIPS: {
            return {
                ...state,
                trips: [...state.trips, action.payload!]
            }
        }
        case Actions.REMOVE_TO_TRIPS: {
            return {
                ...state,
                trips: state.trips.filter(trip => trip.tripId !== action.payload)
            }
        }
        case Actions.GET_TRIPS: {
            return {
                ...state,
                trips: [...action.payload!]
            }
        }
        default:
            return state;
    }
}