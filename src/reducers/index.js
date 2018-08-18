import { combineReducers } from 'redux'
import infoModalReducer from './infoDialog.reducer'
import detailsModalReducer from './detailsModal.reducer'
import skillsReducer from './skills.reducer'

const reducers = {
  detailsModal: detailsModalReducer,
  infoDialog: infoModalReducer,
  skills: skillsReducer,
}

export default combineReducers(reducers)
