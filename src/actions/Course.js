import {fetchData} from "./index.js"
import {CALL_API} from "../middleware/api"

export const fetchGetCourses = () => ({
  [CALL_API]: {
    type: "GET_COURSES",
  }
})


export const fetchGetCoursesMore = (instructor_id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"courses_more", id:instructor_id}).then(result => {
		result.instructor_id = instructor_id;
		return dispatch(result)
	})
}
export const fetchGetMyCourses = (params) => ({
	[CALL_API]: {
		endpoint: "/users/$id/enrollments",
		type: "GET_MY_COURSES",
		params
	}
})

export const fetchGetCourse = (id) => ({
	[CALL_API]: {
		endpoint: "/courses/$id?projection=detail",
	    type: "GET_COURSE",
	    params : {
		    id
	    }
	}
})

export const fetchGetSession = (params) => ({
	[CALL_API]: {
		endpoint : "/sessions/$id?projection=detail",
		type: "GET_SESSION",
		params
	}
})

/*

export const fetchGetSession = (courseId, sessionId) => ({
  [CALL_API]: {
    type: "GET_SESSION",
    url: "/courses/$courseId/sessions/$sessionId",
    params : {
	    courseId,
	    sessionId
    }
  }
});
*/


export const fetchAddCourse = (params) => ({
	[CALL_API]: {
		type:"ADD_COURSE",
		body : params
	}
})
export const fetchAddSession = (params) => ({
	[CALL_API]: {
		endpoint: "/courseSessions",
		type:"ADD_SESSION",
		body : params
	}
})

export const saveLecturePosition = (is_master, pos) => ({
	type:"SAVE_LECTURE_POSITION",
	params: {
		is_master
	},
	value: pos
})
export const saveLessonPosition = (params) => ({
	type:"SAVE_LESSON_POSITION",
	params,
	value: params.pos
})
export const fetchChangeLecture = (params) => ({
	[CALL_API]: {
// 		endpoint: "/lectures/$id",
		url: params.url,
		type:"CHANGE_LECTURE",
		params,
		body: {
			name: params.name
		}
	}
})
export const fetchChangeSession = (params,body) => ({
	[CALL_API]: {
		url: params.url,
		type:"CHANGE_COURSE",
		params,
		body
	}
})

export const fetchChangeLesson = (params) => ({
	[CALL_API]: {
		url: params.url,
		type:"CHANGE_LESSON",
		params,
		body: {
			access: params.access
		}
	}
})



export const fetchSwapLecture = (params) => ({
	[CALL_API]: {
		type:"SWAP_LECTURE",
		params,
		body : {
			pos : params.pos
		}
	}
})
export const fetchSwapLesson = (params) => ({
	[CALL_API]: {
		type:"SWAP_LESSON",
		params,
		body : {
			pos : params.pos
		}
	}
})


export const fetchRequestEnroll = (params) => ({
	[CALL_API]: {
		type:"REQUEST_ENROLL",
		params,
		body : {
			session : params.url
		}
	}
})
export const fetchAddLecture = (params) => ({
	[CALL_API]: {
		type:"ADD_LECTURE",
		endpoint: "/lectures",
		params,
		body : {
			name : params.name,
			session : params.session
		}
	}
})

export const fetchAddLesson = (params) => ({
	[CALL_API]: {
		type:"ADD_LESSON",
		params : params,
		body : {
			name: params.name,
			lecture: params.lecture
		}
	}
})

export const deleteLecture = (params) => ({
	[CALL_API]: {
		endpoint: "/lectures/$id",
		type:"DELETE_LECTURE",
		params : params,
	}
})
export const deleteLesson = (params) => ({
	[CALL_API]: {
		endpoint: "/lessons/$id",
		type:"DELETE_LESSON",
		params : params,
	}
})





/*ENROLLMENTS*/

export const fetchGetEnrollments = (params) => ({
  [CALL_API]: {
	endpoint : "/courseSessions/$id/enrollments",
    type: "GET_ENROLLMENTS",
    params 
  }
})
export const fetchChangeEnrollmentStatus = (params) => ({
	[CALL_API]: {
		endpoint : "/enrollments/$enrollmentId",
		type:"CHANGE_ENROLLMENT_STATUS",
		params,
		body : {
			status: params.status,
		}
	}
})


