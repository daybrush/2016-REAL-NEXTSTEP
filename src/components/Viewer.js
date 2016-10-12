import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'

import AddGoal from './Viewer.add.goal'


import './css/Viewer.css'


class Viewer extends Component {
	componentWillMount() {
		const {actions, courseId} = this.props;
		
		NEXTActions.fetchLoadCourse(actions, courseId);
		document.body.classList.add("modal-open");
	}
	handleClose = (e) => {
		document.body.classList.remove("modal-open");
	}
  render() {
  	const course = this.props.state.course;
	 const {title, goals, lectureId} = course;
    return (
<div className="modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display:"block", background:"rgba(0,0,0,0.3)"}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <Link to={"/lecture/" + lectureId} onClick={this.handleClose}><button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></Link>
        <h3 className="modal-title" id="myModalLabel">{title}</h3>
      </div>
      <div className="modal-body">
      	<h4 className="lecture-goals-title"><span className="glyphicon glyphicon-education"></span>Goals</h4>
        <div className="lecture-goals">
        	{goals.map(goal => (
        	<div className="lecture-goal alert alert-info goal-card" role="alert"><strong>{goal.title}</strong> </div>
        	))}
        	<AddGoal course={course}/>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
     
    )
  }
}


const mapStateToProps = state => {
	return {state: state.Viewer}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)
