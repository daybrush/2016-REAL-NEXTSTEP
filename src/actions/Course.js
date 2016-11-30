import {fetchData} from "./index.js"
import {CALL_API} from "../middleware/api"
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

export const fetchGetCourse = (id) => ({
  [CALL_API]: {
    type: "get",
    target: "course",
    params : {
	    id
    }
  }
});
export const fetchGetParticipants = (id) => ({
  [CALL_API]: {
    type: "get",
    target: "participants",
    params : {
	    id
    }
  }
});

export const fetchAddLesson = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"lesson", id}).then(result =>  dispatch(result))
}


export const fetchAddLecture = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"lecture", id}).then(result =>  dispatch(result))
}