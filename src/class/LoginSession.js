let loginAction = {state:"", actions:""};

export default class LoginSession {
	static isLogin() {
		return (LoginSession.loginInfo.login_status === "LOGIN")
	}
	static bindAction(state, actions) {
		loginAction.state = state
		loginAction.actions = actions
	}
	static fetchGetLoginInfo() {
		return loginAction.actions.fetchGetLoginInfo()
	}
	static login() {
		
	}
	static logout() {
		
	}
	static get loginInfo() {
		return loginAction.state.Login.login
	}
}