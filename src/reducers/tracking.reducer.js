import {
  REQUEST_TRACKING,
  ACCEPT_TRACKING,
  DENY_TRACKING,
} from '~/constants/actionTypes'

const defaultState = {
  trackingRequested: false,
  canTrack: false,
  dialogVisible: false,
}

export default function (state = defaultState, {
  type,
  payload = {},
}) {

  switch (type) {
    case REQUEST_TRACKING: {
      return {
        ...state,
        dialogVisible: true,
        trackingRequested: true,
      }
    }

    case ACCEPT_TRACKING: {
      return {
        ...state,
        dialogVisible: false,
        canTrack: true,
      }
    }

    case DENY_TRACKING: {
      return {
        ...state,
        dialogVisible: false,
        canTrack: false,
      }
    }

    default: {
      return state
    }

  }
}
