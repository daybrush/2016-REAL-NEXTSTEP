import StoreSession from "./StoreSession"

let loginAction = {state:"", actions:""};

export default class LoginSession {
	static isLogin() {
		return (LoginSession.getLoginInfo().login_status === "LOGIN")
	}
	static bindAction(actions) {
		loginAction.actions = actions
	}
	static fetchGetLoginInfo() {
		return loginAction.actions.fetchGetLoginInfo()
	}
	static login() {
		
	}
	static logout() {
		
	}
	static getLoginInfo() {
		return StoreSession.getStore("store").getState().Login.login
	}
}