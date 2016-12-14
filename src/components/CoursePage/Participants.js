import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

class component extends Component {

state = {
	show : false
}

show = () => {
	this.setState({show: true});	
}
hide = () => {
	this.setState({show: false});	
}
componentWillMount(status) {
	const {actions, session} = this.props;
}

renderStatus(status) {
	const success = (<button type="button" key={1} className="btn btn-sm btn-success">승인</button>)
	const decline = (<button type="button" key={2} className="btn btn-sm btn-warning">거부</button>)
	const revoke = (<button type="button" key={3} className="btn btn-sm btn-danger">취소</button>)
	let buttons;
	if(status === "PENDING")
		buttons= [success, decline, revoke]
	
	return (<div className="course-participant-message">{buttons}</div>)
}
render() {
	const enrollments = this.props.session.enrollments || []
	
  	
    
    return (
      <div className={classNames({"course-participants":true, "show-menu":this.state.show})}>
      	<a className="course-participants-close" onClick={this.hide} href="#">x</a>
      	<h3>
      	Members
      	</h3>
      	<ul>
      		{enrollments.map((enrollment,i) =>{
	      		const participant = enrollment.user
	      		return(<li key={i}>
	      			<div className="course-participant">
	      				<img src={participant.avatarUrl} className="course-participant-thumb" />
	      				<div className="course-participant-name">{participant.name}</div>
	      				{this.renderStatus(enrollment.status)}
	      			</div>
	      		</li>
      		)}
      		
      		)}
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
