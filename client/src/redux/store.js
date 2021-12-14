import { useReducer } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import alertreducer from './reducers/alertreducer'
import carreducer from './reducers/careeducer'
import userreducer, { bookingsReducer } from './reducers/bookingreducer'

// below line are for redux devtools
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
})

const rootreducer = combineReducers({
  cr: carreducer,
  ar: alertreducer,
  br: bookingsReducer,
})

// below line are for creating store ,now here we are targetting to combine all reducer into one so first parameter in createstore i.e. "rootreducer" is combination of all reducer and second parameter i.e.  composeEnhancers is one of the object of redux devtools and in  composeEnhancers only we have property of applymiddleware and inside applymiddleware we will write thunk
const store = createStore(
  rootreducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)
export default store
