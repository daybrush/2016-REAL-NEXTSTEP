import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { connect } from 'react-redux'
import LectureCard from '../components/LectureCard'
import AddLectureCard from '../components/LectureCard.add'
import LecturePage from './LecturePage'
import Participants from '../components/CoursePage/Participants'
import './css/CoursePage.css'
import { Link } from 'react-router'


class component extends Component {
	
	componentWillMount() {
		document.body.className = "view-course";
		const {actions, params} = this.props;
		const {id} = params;
	
		//by Course Id
		if(typeof id !== "undefined")
			actions.fetchGetCourse(id);
	}
	renderHeader() {
		const {name, instructors, status} = this.props.state.course;

			
		let statusName;
		
		switch(status) {
			case 1:
				statusName = "수강중";
				break;
			case 2:
				statusName = "강의 끝";
				break;
			default:
				statusName = "강의 예정";
				break;
		}
		return (
			<div className="course-header">
				<span className="course-header-name">{name}</span>
				{instructors.map((instructor,i) => (
				<span className="course-header-professor" key={i}><Link to={"/professor/"+instructor.id} >{instructor.name}</Link></span>				
				))}
				<span className={classNames({
					label:true,
					"label-danger": status === 2,
					"label-success": status === 1,
					"label-warning": status === 0,
					
				})}>{statusName}</span>
			</div>
			
		)
	}
	renderViewer() {
		const lectureId = this.props.params.lectureId;
		
		if(typeof lectureId === "undefined")
			return;
			
		return (
			<LecturePage id={lectureId}/>
		)
	}
	renderParticipants() {
		const course = this.props.state.course;
		if(course.id > 0)
			return (<Participants course={course}/>)
			
		return ""
	}
	render() {
		if(!("course" in this.props.state))
			return "";
			
		const course = this.props.state.course;
  		const {lectures} = course;
  		
  		return (
  		<div className="lecture-list-wrapper">
  		{this.renderViewer()}
  		{this.renderParticipants()}
		{this.renderHeader()}
		<div className="lecture-list">
			{lectures.map((lecture,i) =>
				(<LectureCard key={lecture.id} position={i} lecture={lecture} course={course}/>)
			)}
			<AddLectureCard actions={this.props.actions} course={course}/>
		</div>

  		<div className="lecture-participant-list"></div>
  		</div>
  		)
  	}
}


const mapStateToProps = state => ({state: state.CoursePage})

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)


