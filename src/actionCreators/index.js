/* global window navigator */
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
  reportLesalytics,
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
  console.error(error)
  dispatch(showInfoDialog({
    message: 'Error attempting to fetch!',
    timeout: 2000,
  }))
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

export const fetchSlides = ({ slidename } = {}) => async (dispatch, getState) => {
  dispatch({ type: FETCH_SLIDES })
  dispatch(setIsFetching())
  try {
    if (!getState().slides[slidename]) {
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
    }
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
    const { results } = await getSkills({
      params: { type },
    })
    dispatch({
      type: RECEIVE_SKILLS,
      payload: {
        skills: results,
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
  dispatch({ type: 'ROUTE_CHANGE_START' })
  dispatch(closeAllModals())
}

export const onRouteChangeComplete = () => (dispatch) => {
  dispatch({ type: 'ROUTE_CHANGE_COMPLETE' })
}

export const track = () => (dispatch, getState) => {
  if (process.env.NODE_ENV === 'development') return

  reportLesalytics({
    ref: Cookies.get('LES_REF') || 'unknown user',
    platform: navigator.userAgent,
    page: window.location,
  })
}

export const checkTracking = () => (dispatch, getState) => {
  const {
    tracking: {
      trackingRequested,
      canTrack,
    },
  } = getState()

  const canTrackCookie = Cookies.get('LES_CANTRACK')

  if (canTrackCookie === 'true') {
    dispatch(acceptTracking())
    return
  }

  if (canTrack) {
    dispatch(track())
    return
  }

  if (!trackingRequested) {
    dispatch(requestTracking())
  }
}

export const setTrackingData = data => ({
  ok: true,
})

export const requestTracking = () => ({
  type: REQUEST_TRACKING,
})

export const acceptTracking = () => (dispatch, getState) => {
  Cookies.set('LES_CANTRACK', 'true', { expires: 30 })
  dispatch(track())
  dispatch({ type: ACCEPT_TRACKING })
}

export const denyTracking = () => (dispatch) => {
  Cookies.set('LES_CANTRACK', 'false', { expires: 30 })
  Cookies.remove('LES_REF')
  dispatch(showInfoDialog({
    message: 'No problem, you won\'t be tracked!',
    timeout: 2000,
  }))
  dispatch({ type: DENY_TRACKING })
}
