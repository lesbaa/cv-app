import { RECEIVE_REFERENCES } from '~/constants/actionTypes'
import dedupeArrayOfObjects from '~/utils/dedupeArrayOfObjects'

const defaultState = []

export default function (state = defaultState, {
  type,
  payload = {},
} = {}) {
  switch (type) {
    case RECEIVE_REFERENCES: {
      return dedupeArrayOfObjects({
        array: [
          ...state,
          ...payload.references,
        ],
        field: 'id',
      })
    }

    default: {
      return state
    }
  }
}

