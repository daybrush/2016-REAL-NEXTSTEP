import * as Actions from '../constants/ActionTypes'

const initialState = {
	instructors:[],
}
export default function mainPage(state = initialState, action) {
	switch(action.type ) {
		case Actions.GET_LECTURES_IN_PROFESSOR:
			const instructors = state.instructors.filter(professor => {    
				return instructors.id === action.id
			});
			if(instructors.length !== 1)
				return state;
			instructors[0].courses = Object.assign([], action.courses);
			
			return Object.assign({}, state);
		case Actions.GET_LECTURES:
			if(!action.lectures)
				return state;
				
			state.instructors = action.lectures;
			
			return Object.assign({}, state);
		case Actions.GET_PROFESSOR:
		case Actions.ADD_PROFESSOR:
	}
	return state;
}
