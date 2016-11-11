import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as NEXTActions from '../actions/Login'
import Header from '../components/Header'
import LoginSession from "../class/LoginSession"

class App extends Component {
componentWillMount() {
	const {_state, actions} = this.props;
	LoginSession.bindAction(_state, actions)
	LoginSession.fetchGetLoginInfo()
}
render(){
	console.log("APP PAGE");
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
