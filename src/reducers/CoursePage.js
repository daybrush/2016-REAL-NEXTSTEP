import * as Actions from '../constants/ActionTypes'

const initiallState = {
	course: {
		name:"",
		lectures:[],
		instructors:[],
		status: -1,
		id : -1,
		participants : []
	}
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
		case "GET_PARTICIPANTS":
			state.course.participants = action.participants;
			return Object.assign({}, state);			
		case "ADD_SESSION":
			let lectures2 = state.course.lectures.filter(lecture=>(action.session.lecture.id === lecture.id))
			console.log(lectures2)
			lectures2.forEach(lecture => {
				lecture.sessions.push(action.session)
			})
			return Object.assign({}, state);
	}
	return state;
}
