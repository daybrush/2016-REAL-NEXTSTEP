import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard'
import AddCourseCard from '../components/CourseCard.add'
import Viewer from '../components/Viewer'
import Participants from '../components/Participants'
import './css/CourseListPage.css'

class CourseListPage extends Component {
	
	componentWillMount() {
		document.body.className = "view-lecture";
		const {actions, params} = this.props;
		const {lectureId, courseId} = params;
	
		if(typeof lectureId !== "undefined")
			NEXTActions.fetchLoadCourseAll(actions, lectureId);
		else if(typeof courseId !== "undefined")
			NEXTActions.fetchLoadCourseAllByCourseId(actions, courseId);
			
	}
	renderHeader() {
		const {name, professor, status} = this.props.state.lecture;
		if(!professor)
			return;
			
		let statusName;
		
		switch(status) {
			case 0:
				statusName = "강의 예정";
				break;
			case 1:
				statusName = "수강중";
				break;
			case 2:
				statusName = "강의 끝";
		}
		return (
			<div className="lecture-header">
				<span className="lecture-header-name">{name}</span>
				<span className="lecture-header-professor">{professor.name}</span>				
				<span className={classNames({
					label:true,
					"label-danger": status == 2,
					"label-success": status == 1,
					"label-warning": status == 0,
					
				})}>{statusName}</span>
			</div>
			
		)
	}
	renderViewer() {
		const courseId = this.props.params.courseId;
		
		if(!courseId)
			return;
			
		return (
			<Viewer/>
		)
	}
	render() {
		if(!("lecture" in this.props.state))
			return "";
		const lecture = this.props.state.lecture;
  		const {courses} = lecture;
  		
  		return (
  		<div>
  		{this.renderViewer()}
  		<Participants id={lecture.id}/>
  		<div className="course-list-wrapper">
  			{this.renderHeader()}
  			<div className="course-list">
	  			{courses.map((course,i) =>
		  			(<CourseCard key={course.id} position={i} lecture={lecture} course={course}/>)
		  		)}
		  		<AddCourseCard actions={this.props.actions} lecture={lecture}/>
		  	</div>
  		</div>
  		<div className="course-participant-list"></div>
  		</div>
  		)
  	}
}


const mapStateToProps = state => {
	return {state: state.CourseListPage}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseListPage)
