import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { connect } from 'react-redux'
import LectureCard from '../components/CoursePage/LectureCard'
import AddLectureCard from '../components/CoursePage/LectureCard.add'
//import LecturePage from './LecturePage'
import Participants from '../components/CoursePage/Participants'
import './css/CoursePage.css'
import { Link } from 'react-router'
import LoginSession from "../class/LoginSession"

class component extends Component {
	
	componentWillMount() {
		document.body.className = "view-course";
		const {actions, params} = this.props;
		const {id} = params;
	
		//by Course Id
		if(typeof id !== "undefined")
			actions.fetchGetCourse(id);
	}
	showMenu = () => {
		this.refs.participants.getWrappedInstance().show();
	}
	applyCourse = (e) => {
		if(!confirm("강의를 신청하시겠습니까?"))
			return;
			
			
		const {actions, state} = this.props;
		actions.fetchAddMyCourse(state.course.id).then(result=> {
			alert("신청되었습니다.")
		}).reject(result=> {
			alert("신청하지 못했습니다.")
		})
	}

	renderHeader() {
		const course = this.props.state.course
		const {name, instructors, status} = course;
			
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
		
		const participant = course.participants.filter(participant=>(LoginSession.loginInfo.id === participant.id))
		let applyLabel = ""
		if(participant.length === 0)
			applyLabel = (<a className="course-header-apply label" href="#" onClick={this.applyCourse}>신청하기</a>)
		else if(participant[0].status === "request")
			applyLabel = (<a className="course-header-apply label" href="#">신청중</a>)
		else 
			applyLabel = ""

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
				
				<a className="course-header-btn-show-menu" href="#" onClick={this.showMenu}>
					<span className="glyphicon glyphicon-option-horizontal"></span>
					<span className="course-header-btn-text">Show Menu</span>
				</a>
				
				<a className="course-header-info ">i</a>
				{applyLabel}
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
			return (<Participants course={course} ref="participants"/>)
			
		return ""
	}
	render() {
		if(!("course" in this.props.state))
			return "";
			
		const course = this.props.state.course;
  		const {lectures} = course;
  		
  		let participantStatus;
  		if(!LoginSession.isLogin()) {
	  		participantStatus = "NOT_LOGIN"
  		} else {
	  		const participant = course.participants.filter(participant=>(LoginSession.loginInfo.id === participant.id))
	  		if(participant.length === 0)
	  			participantStatus = "REQUIRE_APPLY"
	  		else if(participant[0].status === "request")
	  			participantStatus = "REQUEST_APPLY"
	  		else
	  			participantStatus = "APPROVED"
	  	}
  			
  		return (
  		<div className="course-lectrues-wrapper">

  		{this.renderParticipants()}
		{this.renderHeader(participantStatus)}
		<div className="course-lectrues">
			{lectures.map((lecture,i) =>
				(<LectureCard key={lecture.id} position={i} lecture={lecture} course={course} status={participantStatus}/>)
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


