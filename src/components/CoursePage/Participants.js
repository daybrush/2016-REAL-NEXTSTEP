import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class component extends Component {

state = {
	show : false
}

show = () => {
	
}
hide = () => {
	
}
componentWillMount() {
	const {actions, course} = this.props;
	if(course.id > 0)
		actions.fetchGetParticipants(course.id);
}
  render() {
  	const participants = this.props.state.course.participants || []
  	
    
    return (
      <div className="course-participants">
      	<ul>
      		<li></li>
      	</ul>
      </div>
    )
  }
}




const mapStateToProps = state => {
	return {state: state.CoursePage}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
