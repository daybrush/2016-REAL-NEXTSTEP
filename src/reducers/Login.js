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
			state.login.login_status = "LOGIN"
			return Object.assign({}, state)
		case "GET_LOGIN_INFO":
			state.login = action.login_info || {}
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
