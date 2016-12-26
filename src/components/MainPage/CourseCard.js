import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './css/CourseCard.css'


class CourseCard extends Component {

//\f007
applyCourse = (e) => {
	if(!confirm("강의를 신청하시겠습니까?"))
		return;
		
		
	const {actions, course} = this.props;
	actions.fetchAddMyCourse(course.id);
}
renderApply() {
    const {  name} = this.props.course;	
	return (
	<a href="#" className="course-title" onClick={this.applyCourse}>
    	<span className="course-title-name">{name}</span>
    	<span className="course-card-options">
    		<i className="fa fa-star-o"></i>
    	</span>
	</a>
        )
}
renderLink() {
	const course = this.props.course
    const {  name, id , instructors} = course
    const instructor = (instructors && instructors[0]) || {}
    
	return (

        <Link to={"/"+ id} className="course-title">
            <div className="course-image img_wrap">
                <img src="http://mooc.phinf.nhnnext.org/20160905_104/1473049200503ef0Bj_PNG/python_.png?type=ffn300_166" width="300" height="166" alt={name}/>
            </div>

            <div className="info">
                <h4 className="course-card-title">{name}</h4>
                <div className="course-card-status">
                    예정 / 진행중 / 종료
                </div>
                
				<div className="course-instructor-profile">
                    <span className="course-profile-image img_wrap">
                    	<img src={instructor.avatarUrl} width="35" height="35" alt="XXXX님"/>
                    </span>                                                    
                    <span className="course-instructor-name">{instructor.name}</span>
				</div>
			</div>
		</Link>
        )
}
  render() {
    
    return (
      <li className="course-card col-xxs-12 col-xs-6 col-sm-4 col-md-3">
		{
			this.renderLink()
		}	    
      </li>
    )
  }
}

const mapStateToProps = state => {
	return {state: state.MyCourses}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCard)
