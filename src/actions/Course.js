import {fetchData} from "./index.js"
import {CALL_API} from "../middleware/api"

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
export const fetchGetEnrollments = (id) => ({
  [CALL_API]: {
    type: "get",
    target: "enrollments",
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
export const saveLecturePosition = (is_master, pos) => ({
	type:"SAVE_LECTURE_POSITION",
	params: {
		is_master
	},
	lecture_position: pos
})
export const saveLessonPosition = (is_master, pos) => ({
	type:"SAVE_LESSON_POSITION",
	params: {
		is_master
	},
	lesson_position: pos
})
export const fetchSwapLecture = (params) => ({
	[CALL_API]: {
		type:"swap",
		target:"lecture",
		params,
		body : {
			pos : params.pos
		}
	}
})
export const fetchSwapLesson = (params) => ({
	[CALL_API]: {
		type:"swap",
		target:"lesson",
		params,
		body : {
			pos : params.pos
		}
	}
})


export const fetchRequestEnrole = (params) => ({
	[CALL_API]: {
		type:"request",
		target:"enrole",
		params,
		body : {
			session : params.url
		}
	}
})
export const fetchAddLecture = (name, is_master, session) => ({
	[CALL_API]: {
		type:"add",
		target:"lecture",
		params : {
			is_master
		},
		body : {
			name,
			session
		}
	}
})

export const fetchAddLesson = (params) => ({
	[CALL_API]: {
		type:"add",
		target:"lesson",
		params : params,
		body : {
			name: params.name,
			lecture: params.lecture
		}
	}
})



