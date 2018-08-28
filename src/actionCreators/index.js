import Cookies from 'js-cookie'
import {
  SHOW_INFO_DIALOG,
  HIDE_INFO_DIALOG,
  SHOW_SKILL_DETAIL_MODAL,
  HIDE_SKILL_DETAIL_MODAL,
  FETCH_SKILLS,
  IS_FETCHING,
  IS_NOT_FETCHING,
  FETCH_ERROR,
  RECEIVE_SKILLS,
  FETCH_SLIDES,
  RECEIVE_SLIDES,
  REQUEST_TRACKING,
  ACCEPT_TRACKING,
  DENY_TRACKING,
} from '~/constants/actionTypes'
import {
  getSkills,
  getSlides,
} from '~/utils/api'

export const setIsFetching = () => ({
  type: IS_FETCHING,
})

export const setIsNotFetching = () => ({
  type: IS_NOT_FETCHING,
})

export const reportFetchError = ({
  error,
}) => (dispatch) => {
  dispatch({
    type: FETCH_ERROR,
    payload: error,
  })
  dispatch(setIsNotFetching())
}

export const hideSkillDetailModal = () => ({ type: HIDE_SKILL_DETAIL_MODAL })

export const hideInfoModal = () => ({ type: HIDE_INFO_DIALOG })

export const closeAllModals = () => (dispatch) => {
  dispatch(hideSkillDetailModal())
  dispatch(hideInfoModal())
}

export const showSkillDetailModal = ({
  id,
  skillType,
}) => async (dispatch, getState) => {

  dispatch(closeAllModals())

  const {
    name: modalTitle,
    desc: modalContent,
  } = getState().skills[skillType][id]

  dispatch({
    type: SHOW_SKILL_DETAIL_MODAL,
    payload: {
      modalTitle,
      modalContent,
      id,
      skillType,
    },
  })
}

export const showInfoDialog = ({
  message,
  timeout = 1000,
}) => (dispatch) => {
  dispatch({
    type: SHOW_INFO_DIALOG,
    payload: {
      message,
    },
  })
  const t = setTimeout(() => {
    dispatch({
      type: HIDE_INFO_DIALOG,
      payload: {
        message,
      },
    })
    clearTimeout(t)
  }, timeout)
}

export const fetchSlides = ({ slidename } = {}) => async (dispatch) => {
  dispatch({ type: FETCH_SLIDES })
  dispatch(setIsFetching())
  try {
    const { results } = await getSlides({
      params: {
        ...(slidename && { id: slidename }),
      },
    })
    dispatch({
      type: RECEIVE_SLIDES,
      payload: {
        slides: results,
      },
    })
    dispatch(setIsNotFetching())
  } catch (error) {
    dispatch(reportFetchError({
      error,
    }))
  }
}

export const fetchSkills = ({
  type,
}) => async (dispatch) => {
  dispatch({ type: FETCH_SKILLS })
  dispatch(setIsFetching())
  try {
    const skills = await getSkills({
      params: { type },
    })
    dispatch({
      type: RECEIVE_SKILLS,
      payload: {
        skills,
        skillType: type,
      },
    })
    dispatch(setIsNotFetching())
  } catch (error) {
    dispatch(reportFetchError({
      error,
    }))
  }
}

export const onRouteChangeStart = () => (dispatch) => {
  dispatch(closeAllModals())
}

export const onRouteChangeComplete = () => (dispatch) => {

}

export const checkTracking = () => (dispatch) => {
  const canTrack = Cookies.get('LES_CANTRACK')
  if (!canTrack) {
    dispatch(requestTracking())
    return
  }
  dispatch(acceptTracking())
}

export const setTrackingData = data => ({
  ok: true,
})

export const requestTracking = () => ({
  type: REQUEST_TRACKING,
})

export const acceptTracking = () => (dispatch) => {
  Cookies.set('LES_CANTRACK', '1', { expires: 365 })
  dispatch({ type: ACCEPT_TRACKING })
}

export const denyTracking = () => (dispatch) => {
  Cookies.remove('LES_CANTRACK')
  Cookies.remove('LES_REF')
  dispatch(showInfoDialog({
    message: 'No problem, you won\'t be tracked!',
    timeout: 2000,
  }))
  dispatch({ type: DENY_TRACKING })
}
