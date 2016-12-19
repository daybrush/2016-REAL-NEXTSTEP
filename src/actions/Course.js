import {fetchData} from "./index.js"
import {CALL_API} from "../middleware/api"
export const fetchAddMyCourse = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"my_course", id}).then(result =>  dispatch(result))
}
export const fetchGetCourses = () => ({
  [CALL_API]: {
    type: "get",
    target: "courses",
  }
})
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
export const fetchGetSession = (courseId, sessionId) => ({
  [CALL_API]: {
    type: "get",
    target: "session",
    url: "/courses/$courseId/sessions/$sessionId",
    params : {
	    courseId,
	    sessionId
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
})

export const fetchAddCourse = (name, description="") => ({
	[CALL_API]: {
		type:"add",
		target:"course",
		body : {
			name, description
		}
	}
})


export const fetchAddLesson = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"lesson", id}).then(result =>  dispatch(result))
}


export const fetchAddLecture = (id) => (dispatch, getState) => {
	return fetchData({type:"add", target:"lecture", id}).then(result =>  dispatch(result))
}


