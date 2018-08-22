import { combineReducers } from 'redux'
import infoModalReducer from './infoDialog.reducer'
import detailsModalReducer from './detailsModal.reducer'
import skillsReducer from './skills.reducer'
import slidesReducer from './slides.reducer'

const reducers = {
  detailsModal: detailsModalReducer,
  infoDialog: infoModalReducer,
  skills: skillsReducer,
  slides: slidesReducer,
}

export default combineReducers(reducers)
