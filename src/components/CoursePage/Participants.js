import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

class component extends Component {

state = {
	show : true
}

show = () => {
	this.setState({show: true});	
}
hide = () => {
	this.setState({show: false});	
}
componentWillMount(status) {
	const {actions, course} = this.props;
	if(course.id > 0)
		actions.fetchGetParticipants(course.id);
}

renderStatus(status) {
	const success = (<button type="button" key={1} className="btn btn-sm btn-success">승인</button>)
	const decline = (<button type="button" key={2} className="btn btn-sm btn-warning">거부</button>)
	const revoke = (<button type="button" key={3	} className="btn btn-sm btn-danger">취소</button>)
	let buttons;
	if(status === "request")
		buttons= [success, decline, revoke]
	
	return (<div className="course-participant-message">{buttons}</div>)
}
render() {
	const participants = this.props.state.course.participants || []
  	
    
    return (
      <div className={classNames({"course-participants":true, "show-menu":this.state.show})}>
      	<h3>
      	Menu
      		<a className="course-participants-close" onClick={this.hide} href="#">x</a>
      	</h3>
      	<ul>
      		{participants.map((participant,i) =>(
	      		<li key={i}>
	      			<div className="course-participant">
	      				<img src={participant.avatar_url} className="course-participant-thumb" />
	      				<div className="course-participant-name">{participant.name}</div>
	      				{this.renderStatus(participant.status)}
	      			</div>
	      		</li>
      		))}
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
  mapDispatchToProps,
  ""
  ,
  {withRef:true}
)(component)
