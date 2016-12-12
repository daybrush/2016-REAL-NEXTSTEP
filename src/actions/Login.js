import {CALL_API} from "../middleware/api"
export const fetchGetLoginInfo = () => ({
	[CALL_API]: {
		type: "get",
		target: "login_info",
	}
})
export const fetchRequestLogin = (data) => ({
	[CALL_API]: {
		type: "request",
		target: "login",
		method: "GET",
		body : {
			code : data.code,
			state : data.state
		}
	}
})

export const fetchRequestLogout = () => ({
	type: "REQUEST_LOGOUT"
})