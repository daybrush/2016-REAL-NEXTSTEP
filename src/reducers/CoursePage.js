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
	let session = state.course.defaultSession || {}
	if(action.params && action.params.is_master)
		session = state.course.masterSession
		
	switch(action.type ) {
		case "GET_COURSE":
			state.course = action.course
			state.course.id = action.params.id
			return Object.assign({}, state)
			
		case "ADD_LECTURE":
			session.lectures.push(action.lecture)
				
			return Object.assign({}, state);
		case "SAVE_LECTURE_POSITION":
			if(session)
				session.pos = action.lecture_position;
			return Object.assign({}, state)
			
		case "SAVE_LESSON_POSITION":
			if(session)
				session.lectures.filter(lecture => {
					return lecture.id === action.params.lectureId
				}).forEach(lecture => {
					lecture.pos = action.lesson_position
				})
			return Object.assign({}, state)
		case "SWAP_LECTURE":
			return state;
		case "GET_PARTICIPANTS":
			session.participants = action.participants;
			return Object.assign({}, state);			
		case "ADD_LESSON":
			let lectures2 = session.lectures.filter(lecture=>(action.params.id === lecture.id))
			lectures2.forEach(lecture => {
				lecture.lessons = lecture.lessons || []
				lecture.lessons.push(action.lesson)
			})
			return Object.assign({}, state);
	}
	return state;
}
