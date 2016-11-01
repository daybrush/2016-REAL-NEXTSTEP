import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'
import SessionCard from '../components/SessionCard'
import AddSession from '../components/SessionCard.add'

import './css/LecturePage.css'





class component extends Component {
	componentWillMount() {
		const {actions, id} = this.props;
		
		actions.fetchGetLecture(id).then(result => {
			const courseId = result.lecture.course.id
			actions.fetchGetCourse(courseId)
		})

		document.body.classList.add("modal-open");
		
		
            
		//console.log("req", require);
	}
	handleClose = (e) => {
		document.body.classList.remove("modal-open");
	}
	handleOutsideClose = (e) => {
		if(e.target !== this.refs.modal)
			return;
		
		this.refs.close.handleClick(e);
		
	}
  render() {
  	const lecture = this.props.state.lecture;
	 const {title, sessions, course} = lecture;
	 
    return (
<div className="modal fade in" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display:"block", background:"rgba(0,0,0,0.3)"}} onClick={this.handleOutsideClose} ref="modal">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <Link to={"/course/" + course.id} onClick={this.handleClose} ref="close"><button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></Link>
        <h3 className="modal-title" id="myModalLabel">{title}</h3>
      </div>
      <div className="modal-body">
      	<h4 className="lecture-sessions-title"><span className="glyphicon glyphicon-education"></span>sessions</h4>
        <div className="lecture-sessions">
        	{sessions.map((session,i) => (
	        	<SessionCard session={session} key={i}  position={i}/>
        	))}
        	<AddSession lecture={lecture}/>
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
	return {state: state.LecturePage}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
