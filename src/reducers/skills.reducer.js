import reduceToKeyValueStore from '~/utils/reduceToKeyValueStore'
import { RECEIVE_SKILLS } from '~/constants/actionTypes'

const defaultState = {}

export default function (state = defaultState, {
  type,
  payload = {},
} = {}) {
  switch (type) {
    case RECEIVE_SKILLS: {
      return {
        ...state,
        [payload.skillType]: {
          ...state[payload.skillType],
          ...reduceToKeyValueStore({
            key: 'id',
            array: payload.skills,
          }),
        },
      }
    }

    default: {
      return state
    }

  }
}
