//import * as Actions from '../constants/ActionTypes'

const initialState = {
	"login" :{
		login_status: "LOGOUT"
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "REQUEST_LOGIN":
			console.log(action.login)
		case "GET_LOGIN_INFO":
		//http://srello.xyz:8080/user
			state.login = action.login_info && action.login_info.principal || action.login || {}
			console.log("LOGIN", state.login)
			if(state.login.error) {
				return state
			}
				
			if(!state.login.login)
				return state

			state.login.login_status = "LOGIN"
			return Object.assign({}, state)
						
		case "REQUEST_LOGOUT":
			state.login = {login_status: "LOGOUT"}
			sessionStorage.removeItem("x-auth-token")
			return Object.assign({}, state)
		default:
			return state;
	}
	//return state;
}
