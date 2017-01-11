import * as Actions from '../constants/ActionTypes'

const initialState = {
	courses:0
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "GET_MY_COURSES":
			state.courses = action.value._embedded.enrollments.map(enrollment => (enrollment.course))
			return Object.assign({}, state);
	}
	return state;
}
