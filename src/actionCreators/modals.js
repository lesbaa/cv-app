import {
  SHOW_INFO_MODAL,
  HIDE_INFO_MODAL,
  SHOW_SKILL_DETAIL_MODAL,
  HIDE_SKILL_DETAIL_MODAL,
} from '~/constants/actionTypes'
import { getDevSkill } from '~/utils/api'

export const hideSkillDetailModal = () => ({ type: HIDE_SKILL_DETAIL_MODAL })

export const hideInfoModal = () => ({ type: HIDE_INFO_MODAL })

export const showSkillDetailModal = ({
  skillId,
  x,
  y,
}) => async (dispatch) => {

  dispatch(hideSkillDetailModal())
  dispatch(hideInfoModal())

  const {
    name: modalTitle,
    desc: modalContent,
  } = await getDevSkill({ skillId })

  dispatch({
    type: SHOW_SKILL_DETAIL_MODAL,
    payload: {
      modalTitle,
      modalContent,
      skillId,
      originX: x,
      originY: y,
    },
  })
}

export const showInfoModal = ({
  title,
  content,
  x,
  y,
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
