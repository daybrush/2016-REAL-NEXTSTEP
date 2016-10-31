import * as Actions from '../constants/ActionTypes'

const initialState = {
	courses:[]
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "GET_MY_COURSES":
			state.courses = action.my_courses;
			return Object.assign({}, state);
		case "ADD_MY_COURSES":
			state.courses.push(action.my_courses);
			return Object.assign({}, state);		
	}
	return state;
}
