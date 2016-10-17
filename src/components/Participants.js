import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class component extends Component {

state = {
	edit : false
}

  render() {
  	const {isLink} = this.props;
  	const is_edit = this.state.edit;
    
    return (
      <div className="lecture-participants">
      	<ul>
      	</ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {state: state.MyLectures}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
