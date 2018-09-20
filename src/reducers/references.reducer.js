import { RECEIVE_REFERENCES } from '~/constants/actionTypes'

const defaultState = []

export default function (state = defaultState, {
  type,
  payload = {},
} = {}) {
  switch (type) {
    case RECEIVE_REFERENCES: {
      return [
        ...state,
        ...payload.references,
      ]
    }

    default: {
      return state
    }

  }
}
