//import * as Actions from '../constants/ActionTypes'

const initialState = {
	"login" :{
		login_status: "LOGOUT"
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "REQUEST_LOGIN":
			state.login = action.login || {}
			const SESSION_ID = state.login.SESSION_ID
			sessionStorage.setItem("SESSION_ID", SESSION_ID)
			state.login.login_status = "LOGIN"
			return Object.assign({}, state)
		case "GET_LOGIN_INFO":
		//http://srello.xyz:8080/user
			state.login = action.login_info || {}
			console.log("LOGIN", state.login)
			if(!state.login.details)
				return state;

			state.login.login_status = "LOGIN"
			return Object.assign({}, state)
						
		case "REQUEST_LOGOUT":
			state.login = {login_status: "LOGOUT"}
			return Object.assign({}, state)
		default:
			return state;
	}
	//return state;
}
