import {
  SHOW_INFO_MODAL,
  HIDE_INFO_MODAL,
} from '~/constants/actionTypes'

const defaultState = {
  modalIsVisible: false,
  modalTitle: null,
  modalContent: null,
}

export default function (state = defaultState, {
  type,
  payload = {},
}) {

  const {
    modalTitle,
    modalContent,
    originX,
    originY,
  } = payload

  switch (type) {
    case SHOW_INFO_MODAL: {
      return {
        ...state,
        modalIsVisible: true,
        modalTitle,
        modalContent,
        originX,
        originY,
      }
    }

    case HIDE_INFO_MODAL: {
      return {
        ...state,
        modalIsVisible: false,
      }
    }

    default: {
      return state
    }

  }
}
