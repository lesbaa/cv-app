import {
  SHOW_INFO_DIALOG,
  HIDE_INFO_DIALOG,
} from '~/constants/actionTypes'

const defaultState = {
  isVisible: false,
  message: null,
}

export default function (state = defaultState, {
  type,
  payload = {},
} = {}) {

  const {
    message,
  } = payload

  switch (type) {
    case SHOW_INFO_DIALOG: {
      return {
        ...state,
        isVisible: true,
        message,
      }
    }

    case HIDE_INFO_DIALOG: {
      return {
        ...state,
        isVisible: false,
      }
    }

    default: {
      return state
    }

  }
}
