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
import { Link} from 'react-router'
import LoginSession from "../class/LoginSession"
import StoreSession from "../class/StoreSession"
import loadPage from "../class/Page"
import Info from "../components/CoursePage/Info"
class component extends Component {
	courseId = "";
	sessionId = "";
	position = [];
	state = {
		show_info : false
	}
	componentWillMount() {
		document.body.className = "view-course";
		const {actions, params} = this.props;
		const {course, session} = params;
		this.courseId = course;
		this.sessionId = session;
		
		console.log("course : " + course + "  session : " + session)
		//by Course Id
		if(typeof course !== "undefined")
			actions.fetchGetCourse(course).catch(e => {
				alert("페이지가 존재하지 않습니다.")
			})
			
			
		StoreSession.setStore("coursepage", this)
		
	}
	componentWillUnmount() {
		StoreSession.unsetStore("coursepage")
	}
	componentWillUpdate() {
		try {
			const session = this.getSession()
			if(typeof session === "undefined")
				return;
			
			this.orderLectures(session);
			this.orderLectures(this.getMaster(), true);
		} catch(e) {
			console.error(e);
			this.props.state.course = {}
		}
	}
	showMenu = () => {
		this.refs.participants.getWrappedInstance().show();
	}
	applyCourse = (e) => {
		if(!LoginSession.isLogin()) {
			alert("로그인을 해주세요.");
			return;
		}
		if(!confirm("강의를 신청하시겠습니까?"))
			return;
			
		
		const {actions, state} = this.props;
		actions.fetchRequestEnroll({
			url : this.getSession()._links.self.href
		}).then(result=> {
			alert("신청되었습니다.")
			
			actions.fetchGetEnrollments({
				id : this.getSession().id
			}).catch(e => {
				console.log(e)
			})
		}).catch(result=> {
			console.error(result)
			alert("신청하지 못했습니다.")
		})
	}
	getSession() {
		return this.props.state.course.defaultSession
	}
	getMaster() {
		return this.props.state.course.masterSession
	}

	renderApplyLabel(memberStatus) {
		switch(memberStatus) {
			case "INSTRUCTOR":
				return (<a className="course-header-apply label" href="#">관리자</a>)		
			case "APPROVED":
				return (<a className="course-header-apply label" href="#">승인 ㅇㅇ</a>)	
			case "PENDING":
				return (<a className="course-header-apply label" href="#">신청중</a>)	
			case "REJECTED":
				return (<a className="course-header-apply label label-danger" href="#">거절당함</a>)	
			case "NOT_LOGIN":
			case "REQUIRE_APPLY":
			default:
				return (<a className="course-header-apply label" href="#" onClick={this.applyCourse}>신청하기</a>)			
		}
		//return (<a className="course-header-apply label" href="#" onClick={this.applyCourse}>신청하기</a>)			
	}
	
	renderHeader(memberStatus) {
		const course = this.props.state.course
		const session = this.getSession()
		const {startDate, endDate} = session
		let {name, state} = this.getSession()
		const instructors = course.instructors
	
	
	
/*
		let nowDate = new Date()
		let stringNowDate = (nowDate.getYear() + 1900) + "-" + (nowDate.getMonth()+1) + "-" + nowDate.getDate()

		
		
		let status = 0;
		
		if(!startDate || !endDate)
			status = 0;
		else if(startDate < stringNowDate && stringNowDate < endDate)
			status = 0;
		else if(startDate > stringNowDate)
			status = 1;
		else if(stringNowDate < endDate)
			status = 2;
*/
		let statusName;
		//IN_SESSION , UPCOMIING, EXPIRED
		switch(state) {
			case "UPCOMIING":
				statusName = "강의 예정";
				break;
			case "EXPIRED":
				statusName = "강의 종료";
				break;
			default:
				state = "IN_SESSION"
				statusName = "강의중";
				break;
		}
		
			  	


		return (
			<div className="course-header">
				<span className={classNames({
					"course-header-status": true,
					label:true,
					"label-end": state === "EXPIRED",
					"label-upcomming": state === "UPCOMMING",
					"label-inprogress label-success": state === "IN_SESSION",
					
				})}>{statusName}</span>
				<span className="course-header-name">{name}</span>
				
				
				{instructors.map((instructor,i) => (
				<span className="course-header-professor" key={i}><Link to={"/professor/"+instructor.id} >{instructor.name}</Link></span>				
				))}
				<a className="course-header-info" href="#" onClick={(e)=>{
					this.setState({show_info:true})
					e.preventDefault()
				}}>i</a>


	
				<a className="course-header-btn-show-menu" href="#" onClick={this.showMenu}>
					<span className="glyphicon glyphicon-option-horizontal"></span>
					<span className="course-header-btn-text">Show Menu</span>
				</a>

				{this.renderApplyLabel(memberStatus)}							


			</div>
			
		)
	}
	renderParticipants(memberStatus) {
		const session = this.getSession()
		if(!session)
			return ""		
		
		return (<Participants session={session} status={memberStatus} ref="participants"/>)
			
		
	}
	orderLectures = (session, is_master = false) => {
  		const objLectures = {};
		let pos = session.pos || []
		let lectures = session.lectures
		
  		let addPos = lectures.filter(lecture => {
	  		objLectures[lecture.id] = lecture;
	  		try {
		  		if(typeof pos === "string")
		  			pos = JSON.parse(pos)
		  	} catch(e) {
			  	pos = []
		  	}
		  	session.pos = pos
	  		return pos.every((id, index) => {
		  		
		  		//lecture가 pos Array에  하나라도 없을 때 true를 return한다.
		  		
				if(id instanceof Array)
					return id.indexOf(lecture.id) === -1
				
				return id !== lecture.id
	  		})
  		}).map(lecture=>(lecture.id))



  		let is_update = false;

  		
  		if(addPos.length > 0) {
	  		pos = pos.concat(addPos);
	  		is_update = true;

  		}
  		
  		addPos = pos;
  		pos = pos.filter((id, i) => {
	  		if(id instanceof Array) {
		  		id = pos[i] = id.filter(id => (id in objLectures))
				return id.length !== 0 && id.every(id => (id in objLectures))
			}
				
			return id in objLectures
	  		
	  		
	  	})

  		if(pos.length !== addPos.length) {
	  		is_update = true;
  		}
  		
  		if(is_update) {
	  		const id = session.id
	  		console.log(id, session)
			this.props.actions.saveLecturePosition(is_master, pos)
			this.props.actions.fetchSwapLecture({
				id,
				pos, 
				is_master,
				url: session._links.self.href
			})

  		}
  		
  		
  		return pos;
	}
	
	renderLectures(session,  memberStatus, is_master = false ) {

  		const course = this.props.state.course;
		const objLectures = {};

		const lectures = session.lectures
		
		
	  	lectures.filter(lecture => {
	  		objLectures[lecture.id] = lecture;
		});	
		

		let pos = this.orderLectures(session, is_master);

		
		const _pos = pos.map((id, i)=> {
			if(typeof id === "object")
				return id.map(id => {
					return objLectures[id]
				})
			
			
			return objLectures[id]
		})

		const participants = this.getSession().enrollments.filter(enrollment=>(enrollment.status === "APPROVED"))
		
		
  		return (<div className="lecture-cards">{_pos.map((_lecture,i) => {
	  			let sublecture = [];
	  			let lecture = _lecture
	  			if(typeof _lecture === "undefined") {
	  				return;
	  			} else if(_lecture instanceof Array) {
		  			if(!_lecture.length)
		  				return;
		  				
		  			lecture = _lecture[0];
		  			sublecture = _lecture.slice(1, _lecture.length);
		  			
	  			}
	  			const props = {
					key: lecture.id,
					position: i,
					lecture: lecture,
					sublecture: sublecture,
					course: course,
					session,
					status: memberStatus,
					is_master:is_master,
					participants: participants
				}
				return (<LectureCard {...props}/>)
			})}</div>)
  		

	}
	renderMaster(memberStatus) {

		if(this.sessionId === "master" )
			return;

		const course =this.props.state.course;
		const master = this.getMaster();

		
		if(!master)			
			return;

  		const addLectureCard = memberStatus === "INSTRUCTOR" ?(<AddLectureCard actions={this.props.actions} course={course} session={master} is_master={true}/>) : ""
		return (
			<div className="course-master-lectures">
				{this.renderLectures(master, memberStatus, true)}
				{addLectureCard}
			</div>
		)
	}
	renderLoading() {
		return (
			<div className="course-loading">
				<p><img src="/images/loading.gif" height="60"/></p>
				<p>Loading...</p>
			</div>
			
		)
	}
	getMemberStatus() {
		const course = this.props.state.course
		let memberStatus = "NOT_LOGIN"

		if(LoginSession.isLogin()) {
	  		const loginInfo = LoginSession.getLoginInfo().user
	  		const instructor = course.instructors.filter(instructor => (loginInfo.username === instructor.username))
	  		const enrollment = this.getSession().enrollments.filter(enrollment=>(enrollment.user.username === loginInfo.username))
	  		if(instructor.length !== 0) 
	  			memberStatus = "INSTRUCTOR"
	  		else if(enrollment.length === 0)
	  			memberStatus = "REQUIRE_APPLY"
	  		else if(enrollment[0].status === "PENDING")
	  			memberStatus = "PENDING"
	  		else if(enrollment[0].status === "REJECTED")
	  			memberStatus = "REJECTED"
	  		else
	  			memberStatus = "APPROVED"
	  	}
	  	
	  	return memberStatus
	}
	renderInfo() {
		if(this.state.show_info)
			return (<Info CoursePage={this}/>)
	}
	render() {
		if(!("course" in this.props.state))
			return loadPage("loading")


		const course = this.props.state.course

		if(!("defaultSession" in course))
			return loadPage("loading")
			
		const session = this.getSession()
			
		if(!session)
			return loadPage("error", {message: "관리자에게 문의해주세요. ", submessage: "message:No Session"})
			

						
  		const {lectures} = session;

  		
  		let memberStatus = this.getMemberStatus();
  		
  		
  		
  		const addLectureCard = memberStatus === "INSTRUCTOR" ?(<AddLectureCard actions={this.props.actions} course={course} session={session} is_master={false}/>) : ""
  		
  		return (
  		<div className="course-lectrues-wrapper">


  		
		{this.renderHeader(memberStatus)}
		{this.renderParticipants(memberStatus)}  
		{this.renderInfo()}		
		<div className="course-lectures">
			<div className="course-session-lectures">
			{this.renderLectures(session, memberStatus, false)}
				{addLectureCard}
			</div>
			{this.renderMaster(memberStatus)}
		</div>
  		<div className="lecture-participant-list"></div>
  		</div>
  		)
  	}
}


const mapStateToProps = state => ({state: state.CoursePage, state2:state.Login})

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)


 