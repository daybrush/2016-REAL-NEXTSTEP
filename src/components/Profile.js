import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../actions/Login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './css/Profile.css'
import LoginSession from "../class/LoginSession"
import OAuth from '../class/OAuth2'

class component extends Component {

state = {
	show : false
}
//\f007
toggle = () => {
	this.setState({show:!this.state.show});
}
show = () => {
	this.setState({show:true});
}
hide = () => {
	this.setState({show:false});	
}

componentWillMount() {

	window.requestLogin = this.requestLogin


}

requestLogin = (data) => {
	this.props.actions.fetchRequestLogin(data).then(data=> {
		return LoginSession.fetchGetLoginInfo()
	}).catch(data => {
		console.log(data);
		alert("로그인에 실패하였습니다.")
	})
}


login = () => {
	const dispatch = this.props.dispatch;

	const oauth = new OAuth({
		name: "github",
		authorize_uri : "https://github.com/login/oauth/authorize",
		client_id: "1500e8bb648222bc11a2",//process.env.REACT_APP_OAUTH_CLIENT_ID,
		redirect_uri :process.env.REACT_APP_OAUTH_REDIRECT_URI,
		scope: "user",
		
	});
	oauth.login();
}
logout = () => {
	this.hide();
	this.props.actions.fetchRequestLogout()
}
renderLoginForm() {
	return (<a onClick={this.login}>Login</a>)
}
renderLoginStatus() {
	let is_show = this.state.show;
	const {name,id,avatarUrl} = LoginSession.getLoginInfo().user
	return (
		<div>
		<div className="btn header-btn" onClick={this.toggle}><img src={avatarUrl}/> <strong>{name}</strong></div>
			<div className="profile-dialog modal-dialog" role="document" style={{display:(is_show?"block":"none")}}>
			<div className="modal-content">
			  <div className="modal-header">
			    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}><span aria-hidden="true">&times;</span></button>
			    <h4 className="modal-title" id="exampleModalLabel">{name}</h4>
			  </div>
			  <div className="modal-body">
			<ul className="list-group">
			<li className="list-group-item">Profile</li>
			<li className="list-group-item">My Lectures</li>
			<li className="list-group-item last" onClick={this.logout}>Logout</li>
			</ul>
			</div>
			</div>
		</div>
		</div>
	)
}
render() {
	return (
		<div className="header-profile">
			{LoginSession.isLogin() ? this.renderLoginStatus() : this.renderLoginForm()}
		</div>
		)
}


}

const mapStateToProps = state => {
	return {state: state.Login}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
