import {
  SHOW_INFO_MODAL,
  HIDE_INFO_MODAL,
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

export const hideInfoModal = () => ({ type: HIDE_INFO_MODAL })

export const showSkillDetailModal = ({
  id,
  skillType,
}) => async (dispatch, getState) => {

  dispatch(hideSkillDetailModal())
  dispatch(hideInfoModal())
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

export const showInfoModal = ({
  title,
  content,
}) => (dispatch) => {

  dispatch(hideSkillDetailModal())
  dispatch(hideInfoModal())

  dispatch({
    type: SHOW_INFO_MODAL,
    payload: {
      title,
      content,
      originX: x,
      originY: y,
    },
  })
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

export const onRouteChangeStart = () => ({})
export const onRouteChangeComplete = () => ({})