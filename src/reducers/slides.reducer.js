import reduceToKeyValueStore from '~/utils/reduceToKeyValueStore'
import { RECEIVE_SLIDES } from '~/constants/actionTypes'

const defaultState = {}

export default function (state = defaultState, {
  type,
  payload = {},
}) {
  switch (type) {
    case RECEIVE_SLIDES: {
      return {
        ...state,
        ...reduceToKeyValueStore({
          key: 'id',
          array: payload.slides,
        }),
      }
    }

    default: {
      return state
    }

  }
}
