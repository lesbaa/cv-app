import { combineReducers } from 'redux'
import infoModalReducer from './infoModal.reducer'
import detailsModalReducer from './detailsModal.reducer'

const reducers = {
  detailsModal: detailsModalReducer,
  infoModal: infoModalReducer,
}

export default combineReducers(reducers)
