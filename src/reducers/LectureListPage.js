import * as Actions from '../constants/ActionTypes'

const initiallState = {
	course: {
		name:"",
		lectures:[],
		instructors:[],
		status: -1,
		participants : []
	},
}

export default function CourseListPage(state = initiallState, action) {
	switch(action.type ) {
		case "GET_COURSE":
			state.course = action.course;
			return Object.assign({}, state);
		case "ADD_LECTURE":
			state.course.lectures.push(action.lecture);
			return Object.assign({}, state);
		case "SWAP_LECTURE":
			
			let lectures = state.course.lectures, b;
			
			b = lectures[action.myPosition];
			lectures.splice(action.myPosition,1);
			lectures.splice(action.targetPosition,0, b);
			
			return Object.assign({}, state);
		case Actions.GET_PARTICIPATNS:
			state.course.participants = state.participants;
			return Object.assign({}, state);			
	}
	return state;
}
