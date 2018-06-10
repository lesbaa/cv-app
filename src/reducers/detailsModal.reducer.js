import {
  SHOW_SKILL_DETAIL_MODAL,
  HIDE_SKILL_DETAIL_MODAL,
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
    id,
  } = payload

  switch (type) {
    case SHOW_SKILL_DETAIL_MODAL: {
      return {
        ...state,
        modalIsVisible: true,
        modalTitle,
        id,
        modalContent,
      }
    }

    case HIDE_SKILL_DETAIL_MODAL: {
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
