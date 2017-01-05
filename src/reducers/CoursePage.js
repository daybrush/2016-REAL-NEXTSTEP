import * as Actions from '../constants/ActionTypes'
import {addTypes, checkType} from './Reducer'
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


addTypes({
	"GET_COURSE" : function(state, action, session) {
		state.course = action.value
		state.course.id = action.params.id
		return Object.assign({}, state)
	},
	"GET_SESSION": function(state, action, session) {
		state.course.defaultSession = action.value
		return Object.assign({}, state)
	},
	"ADD_LECTURE": function(state, action, session) {
		session.lectures.push(action.value)
		return Object.assign({}, state);
	},
	"SAVE_LECTURE_POSITION": function(state, action, session) {
		if(session)
			session.pos = action.value;
		return Object.assign({}, state)		
	},
	"SAVE_LESSON_POSITION": function(state, action, session) {
		if(!session)
			return state;
			
		session.lectures.filter(lecture => {
			return lecture.id === action.params.lectureId
		}).forEach(lecture => {
			lecture.pos = action.value
		})
		return Object.assign({}, state)
	},
	"CHANGE_LECTURE": function(state, action, session) {
		session.lectures.filter(lecture => {
			return lecture.id === action.params.id
		}).forEach(lecture => {
			for(var key in action.body) {
				lecture[key] = action.body[key]
			}
		})
		return Object.assign({}, state)
	},
	"CHANGE_LESSON" : function(state, action, session) {
		session.lectures.filter(lecture => {
			return lecture.id === action.params.lectureId
		}).map(lecture => {
			const lessons = lecture.lessons
			for(var index in lessons) {
				if(lessons[index].id === action.params.lessonId)
					return lessons[index]
			}
			return
		}).forEach(lesson => {
			if(!lesson)
				return;
			
			for(var key in action.body) {
				lesson[key] = action.body[key]
			}
		})
		return Object.assign({}, state)
	},
	"SWAP_LECTURE" : state => (state),
	"GET_ENROLLMENTS" : (state, action, session) => {
		session.enrollments = action.value._embedded.enrollments;
		return Object.assign({}, state);
	},
	"ADD_LESSON": (state, action, session) => {
		let lectures2 = session.lectures.filter(lecture=>(action.params.id === lecture.id))

		lectures2.forEach(lecture => {
			lecture.lessons = lecture.lessons || []
			lecture.lessons.push(action.value)
		})
		return Object.assign({}, state);
	},
	"DELETE_LESSON": (state, action, session) => {
		let lectures3 = session.lectures.filter(lecture=>(action.params.lectureId === lecture.id))
		console.log(lectures3);
		lectures3.forEach(lecture => {
			lecture.lessons = lecture.lessons.filter(lesson=>(action.params.id !== lesson.id))
		})
		return Object.assign({}, state);
	},
	"DELETE_LECTURE": (state, action, session) => {
		session.lectures = session.lectures.filter(lecture=>(action.params.id !== lecture.id))
		return Object.assign({}, state);
	}
})


export default function CourseListPage(state = initiallState, action) {
	let session = state.course.defaultSession || {}
	if(action.params && action.params.is_master)
		session = state.course.masterSession
	
	return checkType(state, action, session)

}
