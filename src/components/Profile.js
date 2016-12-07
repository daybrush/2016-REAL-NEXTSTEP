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
		console.log(data);
		if (data.login.error) {
			
		}
	}).catch(data => {
		alert("로그인에 실패하였습니다.")
	})
}


login = () => {
	const dispatch = this.props.dispatch;

	const oauth = new OAuth({
		client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
		redirect_uri : process.env.REACT_APP_OAUTH_REDIRECT_URI
	});

/*
	const oauth = new OAuth({
		client_id:"e707ca2f9a1556499b5a",
		redirect_uri : "http://srello.xyz/login.html",
	});
*/

/*
	const oauth = new OAuth({
		client_id:"74b090b94e7948c86957",
		redirect_uri : "http://localhost:3001/login.html",
	});
*/
	oauth.login();
	
	

}
logout = () => {
	this.props.actions.fetchRequestLogout()
}
renderLoginForm() {
	return (<a onClick={this.login}>Login</a>)
}
renderLoginStatus() {
	let is_show = this.state.show;
	const {name,id,avatar_url} = LoginSession.getLoginInfo()
	return (
		<div>
		<div className="btn header-btn" onClick={this.toggle}><img src={avatar_url}/> <strong>{name}</strong></div>
			<div className="profile-dialog modal-dialog modal-sm" role="document" style={{display:(is_show?"block":"none")}}>
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
