import * as Actions from '../constants/ActionTypes'

const initiallState = {
	course: {
		name:"",
		instructors:[],
		status: -1,
		id : -1,
		session : {},
		master : {}
	}
}

export default function CourseListPage(state = initiallState, action) {
	let session = state.course.session
	if(action.params && action.params.is_master)
		session = state.course.master
		
	switch(action.type ) {
		case "GET_COURSE":
			state.course = action.course;
			return Object.assign({}, state);
			
		case "ADD_LECTURE":
			session.lectures.push(action.lecture)
				
			return Object.assign({}, state);
		case "SAVE_LECTURE_POSITION":
			session.pos = action.lecture_position;
				
			return Object.assign({}, state)
		case "SWAP_LECTURE":
			return state;
		case "GET_PARTICIPANTS":
			state.course.session.participants = action.participants;
			return Object.assign({}, state);			
		case "ADD_LESSON":
			let lectures2 = session.lectures.filter(lecture=>(action.lesson.lecture.id === lecture.id))
			console.log(lectures2)
			lectures2.forEach(lecture => {
				lecture.lessons.push(action.lesson)
			})
			return Object.assign({}, state);
	}
	return state;
}
