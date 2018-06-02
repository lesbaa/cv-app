import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '~/reducers'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

export default function initializeStore(initialState = exampleInitialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    ),
  )
}
