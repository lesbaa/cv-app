import {
  IS_FETCHING,
  IS_NOT_FETCHING,
  FETCH_ERROR,
} from '~/constants/actionTypes'

const initState = {
  isFetching: false,
  fetchError: {
    hasError: false,
    error: null,
  },
}

export default function (state = initState, {
  type,
  payload = {},
} = {}) {
  switch (type) {
    case IS_FETCHING: {
      return {
        ...initState,
        isFetching: true,
      }
    }
    case IS_NOT_FETCHING: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case FETCH_ERROR: {
      return {
        ...state,
        isFetching: false,
        fetchError: {
          hasError: true,
          error: payload,
        },
      }
    }

    default: {
      return { ...state }
    }
  }
}