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
} from '~/constants/actionTypes'
import { getSkills } from '~/utils/api'

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