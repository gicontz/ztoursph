import { Actions, ToursState, ToursTypes } from "./types";

export const tours  = (state: ToursState, action: ToursTypes): ToursState => {
    switch(action.type) {
        case Actions.GET_TOURS_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case Actions.GET_TOURS_FULFILLED: {
            return {
                ...state,
                isLoading: false,
                tours: [...state.tours, ...action.payload!.records],
                totalRecords: action.payload!.totalRecords,
            }
        }
        case Actions.GET_TOURS_FAILED: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case Actions.GET_TOUR_INFO_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case Actions.GET_TOUR_INFO_FULFILLED: {
            return {
                ...state,
                isLoading: false,
                selectedTour: { ...action.payload! },
            }
        }
        case Actions.GET_TOUR_INFO_FAILED: {
            return {
                ...state,
                isLoading: false,
            }
        }
        default:
            return state;
    }
}