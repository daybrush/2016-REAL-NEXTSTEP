import * as Actions from '../constants/ActionTypes'

const initialState = {
	courses:[],
}
export default function mainPage(state = initialState, action) {
	switch(action.type ) {
		case "GET_COURSES":
			if(!action.courses)
				return state;
				
			state.courses = action.courses.courses  && action.courses.courses  || action.courses;
			
			return Object.assign({}, state);
		case Actions.GET_PROFESSOR:
		case Actions.ADD_PROFESSOR:
	}
	return state;
}
