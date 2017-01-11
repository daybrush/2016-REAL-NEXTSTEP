import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as NEXTActions from '../actions/Login'
import Header from '../components/Header'
import LoginSession from "../class/LoginSession"
import StoreSession from "../class/StoreSession"

class App extends Component {
componentWillMount() {
	const {_state, actions} = this.props;
	LoginSession.bindAction(actions)
	
	
	if(sessionStorage.getItem("x-auth-token")) {
		LoginSession.fetchGetLoginInfo().catch(e => {
			console.log("Not Login")
		})
	}		
	StoreSession.setStore("history", this.history)
}
componentWillUpdate() {

}
componentWillUnmount() {
	StoreSession.unsetStore("history")
}
render(){
	const { children} = this.props
	

	 return (
  <div>
  	<Header/>
  	<div className="body-wrapper">
  		{children}
  	</div>
  </div>
  );
}
}

const mapStateToProps = state => {
	return {state: state.Login, _state:state}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
