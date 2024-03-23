import React, { createContext } from 'react';

import { TripsState, TripsTypes } from '@app/modules/trips/types';

type TTripsContext = {
  tripStore: TripsState;
  tripDispatch: (i: TripsTypes) => void;
}

export const defaultState: TTripsContext = {
    tripStore: {
        trips: [],
    },
    tripDispatch: (inv: TripsTypes): void => {},
};

const tripsContextProvider = createContext(defaultState);

export const useTripsContext = (): TTripsContext => React.useContext(tripsContextProvider);

export default tripsContextProvider;