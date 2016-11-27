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
		case "SAVE_LECTURE_POSITION":
			
			state.course.pos = action.lecture_position;
			return state;
		case "SWAP_LECTURE":
			return state;
		case "GET_PARTICIPANTS":
			state.course.participants = action.participants;
			return Object.assign({}, state);			
		case "ADD_LESSON":
			let lectures2 = state.course.lectures.filter(lecture=>(action.lesson.lecture.id === lecture.id))
			console.log(lectures2)
			lectures2.forEach(lecture => {
				lecture.lessons.push(action.lesson)
			})
			return Object.assign({}, state);
	}
	return state;
}
