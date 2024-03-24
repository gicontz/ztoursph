import { Actions, TripsState, TripsTypes } from "./types";
import { defaultState } from '@app/providers/trips';
import update from 'immutability-helper';

export const trips  = (state: TripsState = defaultState.tripStore, action: TripsTypes): TripsState => {
    switch(action.type) {
        case Actions.ADD_TO_TRIPS: {
            return {
                ...state,
                trips: [...state.trips, action.payload!]
            }
        }
        case Actions.REMOVE_TO_TRIPS: {
            return update(state, {
                trips: {
                    $apply: (trips) => trips.filter(trip => trip.tripId !== action.payload)
                }
            })
        }
        case Actions.GET_TRIPS: {
            return {
                ...state,
                trips: [...action.payload!]
            }
        }
        case Actions.SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case Actions.SET_PAX_TO_TRIPS: {
            const data = action.payload
            if (data) {
                const index = state.trips.findIndex(trip => trip.tripId === data.id);
                if (index !== -1) {
                    return update(state, {
                        trips: {
                            [index]: {
                                $apply: obj => update(obj, { $merge: { tripId: data.id, numberOfTraveller: data.pax } })
                            }
                        }
                    
                    })
                }
            }
            return state;
        }
        default:
            return state;
    }
}