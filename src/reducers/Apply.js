import * as Actions from '../constants/ActionTypes'

const initialState = {
	courses:[],
}
export default function mainPage(state = initialState, action) {
	switch(action.type ) {
		case "GET_COURSES":
			if(!action.value)
				return state
				
			state.courses = action.value.courses  && action.value.courses  || action.value
			
			return Object.assign({}, state)
		case "ADD_COURSE": {
			if(!action.value)
				return state
				
			state.courses._embedded && state.courses._embedded.courses.push(action.value)

			return Object.assign({}, state)
		}
		case Actions.GET_PROFESSOR:
		case Actions.ADD_PROFESSOR:
	}
	return state
}
