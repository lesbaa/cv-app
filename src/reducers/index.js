import { combineReducers } from 'redux'
import infoModalReducer from './infoDialog.reducer'
import detailsModalReducer from './detailsModal.reducer'
import skillsReducer from './skills.reducer'
import slidesReducer from './slides.reducer'
import trackingReducer from './tracking.reducer'
import networkReducer from './network.reducer'

const reducers = {
  detailsModal: detailsModalReducer,
  infoDialog: infoModalReducer,
  skills: skillsReducer,
  slides: slidesReducer,
  tracking: trackingReducer,
  network: networkReducer,
}


export default combineReducers(reducers)
