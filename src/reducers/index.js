import { combineReducers } from 'redux'
import infoModalReducer from './infoModal.reducer'
import detailsModalReducer from './detailsModal.reducer'
import skillsReducer from './skills.reducer'

const reducers = {
  detailsModal: detailsModalReducer,
  infoModal: infoModalReducer,
  skills: skillsReducer,
}

export default combineReducers(reducers)
