import { Dispatch, useReducer } from "react";
import { Actions, ToursState, ToursTypes } from "./types";
import { tours } from "./reducer";
import { getTours as getToursApi, getTourBySlug as getTourBySlugApi, getTrips as getTripsApi } from "@app/services/tours";

const defaultState = {
    isLoading: false,
    tours: [],
    selectedTour: null,
    totalRecords: 0,
    trips: [],
}

export const useTours = (): [ToursState, React.Dispatch<ToursTypes>] => {
    const [state, dispatch] = useReducer(tours, defaultState);
    return [state, dispatch];
};

export const getTours = async (dispatch: Dispatch<ToursTypes>, options?: { pageNumber?: number; pageSize?: number; searchText?: string }) => {
    if (options) {
        const { pageNumber, pageSize, searchText } = options;
        if (pageNumber && pageSize) {
            dispatch({ type: Actions.GET_TOURS_START });
            try {
                const { data } = await getToursApi({ pageNumber, pageSize, searchText });
                dispatch({ type: Actions.GET_TOURS_FULFILLED, payload: { records: [...data.records], totalRecords: data.totalRecords }});
            } catch (e) {
                console.log('Error', e);
                dispatch({ type: Actions.GET_TOURS_FAILED });
            }
        }
    }
}

export const getTourBySlug = async (dispatch: Dispatch<ToursTypes>, slug: string) => {
    dispatch({ type: Actions.GET_TOUR_INFO_START });
    try {
        const { data } = await getTourBySlugApi(slug);
        dispatch({ type: Actions.GET_TOUR_INFO_FULFILLED, payload: { ...data }});
    } catch (e) {
        console.log(e);
        dispatch({ type: Actions.GET_TOUR_INFO_FAILED });
    }
}

export const getTrips = async (dispatch: Dispatch<ToursTypes>, ids: Array<string | number>) => {
    dispatch({ type: Actions.GET_TRIPS_START });
    try {
        const { data } = await getTripsApi(ids);
        console.log(data);
        dispatch({ type: Actions.GET_TRIPS_FULFILLED, payload: [ ...data.records ]});
    } catch (e) {
        console.log(e);
        dispatch({ type: Actions.GET_TRIPS_FAILED });
    }
}