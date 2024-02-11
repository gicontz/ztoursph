import { Actions, PackagesState, PackagesTypes } from "./types";

export const packages = (
  state: PackagesState,
  action: PackagesTypes
): PackagesState => {
  switch (action.type) {
    case Actions.GET_PACKAGES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case Actions.GET_PACKAGES_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        packages: [...state.packages, ...action.payload!.records],
        totalRecords: action.payload!.totalRecords,
      };
    }
    case Actions.GET_PACKAGES_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case Actions.GET_PACKAGE_INFO_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case Actions.GET_PACKAGE_INFO_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        selectedPackage: { ...action.payload! },
      };
    }
    case Actions.GET_PACKAGE_INFO_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
