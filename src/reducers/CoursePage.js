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
			state.course = action.value
			state.course.id = action.params.id
			return Object.assign({}, state)
			
		case "ADD_LECTURE":
			session.lectures.push(action.value)
				
			return Object.assign({}, state);
		case "SAVE_LECTURE_POSITION":
			if(session)
				session.pos = action.value;
			return Object.assign({}, state)
			
		case "SAVE_LESSON_POSITION":
			if(!session)
				return state;
				
			session.lectures.filter(lecture => {
				return lecture.id === action.params.lectureId
			}).forEach(lecture => {
				lecture.pos = action.value
			})
			return Object.assign({}, state)
		case "CHANGE_LECTURE":

			session.lectures.filter(lecture => {
				return lecture.id === action.params.id
			}).forEach(lecture => {
				for(var key in action.body) {
					lecture[key] = action.body[key]
				}
			})
			return Object.assign({}, state)
		case "SWAP_LECTURE":
			return state;
		case "GET_ENROLLMENTS":
			session.enrollments = action.value._embedded.enrollments;
			return Object.assign({}, state);			
		case "ADD_LESSON":
			let lectures2 = session.lectures.filter(lecture=>(action.params.id === lecture.id))

			lectures2.forEach(lecture => {
				lecture.lessons = lecture.lessons || []
				lecture.lessons.push(action.value)
			})
			return Object.assign({}, state);
		case "DELETE_LESSON":
			let lectures3 = session.lectures.filter(lecture=>(action.params.lectureId === lecture.id))
			console.log(lectures3);
			lectures3.forEach(lecture => {
				lecture.lessons = lecture.lessons.filter(lesson=>(action.params.id !== lesson.id))
			})
			return Object.assign({}, state);
		case "DELETE_LECTURE":
			session.lectures = session.lectures.filter(lecture=>(action.params.id !== lecture.id))
			return Object.assign({}, state);
						
	}
	return state;
}
