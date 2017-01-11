import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import asyncMiddleware from '../middleware/api';
const loggerMiddleware = createLogger()
/*

function thunkMiddleware({ dispatch, getState }) {  
	return next => action => {
		if(typeof action === 'function') {
			return action(dispatch, getState);
		} else if(action && action.type === "REQUEST_FETCH") {
			action.promise.then(result => next({type:"HIHI", result}))
		}
		return next(action);	
	}
}
*/



export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
       asyncMiddleware,
thunkMiddleware,
      loggerMiddleware
    )
  )
}