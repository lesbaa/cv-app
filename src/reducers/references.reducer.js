import reduceToKeyValueStore from '~/utils/reduceToKeyValueStore'
import { RECEIVE_REFERENCES } from '~/constants/actionTypes'

const defaultState = {}

export default function (state = defaultState, {
  type,
  payload = {},
} = {}) {
  switch (type) {
    case RECEIVE_REFERENCES: {
      return {
        ...state,
        ...reduceToKeyValueStore({
          key: 'id',
          array: payload.references,
        }),
      }
    }

    default: {
      return state
    }

  }
}
