import {fetchData} from "./index.js"

export const fetchAddMyCourse = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"my_course", id}).then(result =>  dispatch(result))
}
export const fetchGetCourses = () => (dispatch, getState) => {
	return fetchData({type:"get", target:"courses"}).then(result => { result.courses = result.courses._embedded.courses;return dispatch(result)})
}
export const fetchGetMyCourses = () => (dispatch, getState) => {
	return fetchData({type:"get", target:"my_courses"}).then(result =>  dispatch(result))
}


export const fetchGetCoursesMore = (instructor_id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"courses_more", id:instructor_id}).then(result => {
		result.instructor_id = instructor_id;
		return dispatch(result)
	})
}

export const fetchGetCourse = (id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"course", id}).then(result =>  dispatch(result))
}
export const fetchGetParticipants = (id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"participants", id}).then(result =>  dispatch(result))
}
export const fetchGetLecture = (id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"lecture", id}).then(result =>  dispatch(result))
}

export const fetchAddLesson = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"lesson", id}).then(result =>  dispatch(result))
}