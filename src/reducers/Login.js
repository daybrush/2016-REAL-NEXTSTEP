//import * as Actions from '../constants/ActionTypes'

const initialState = {
	"login" :{
		login_status: "LOGOUT"
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "REQUEST_LOGIN":
			return state;
		case "GET_LOGIN_INFO":
		//http://srello.xyz:8080/user
			state.login = action.login_info || action.login || {}
			console.log("LOGIN", state.login)
			if(state.login.error) {
				return state
			}
				
			if(!state.login.user.username)
				return state
			try {
				state.login.role = state.login.authorities[0].authority || "ROLE_USER"
			} catch(e) {
				state.login.role = "ROLE_USER"
			}
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
