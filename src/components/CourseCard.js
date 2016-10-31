import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './css/CourseCard.css'


class CourseCard extends Component {

//\f007
applyCourse = (e) => {
	if(!confirm("강의를 신청하시겠습니까?"))
		return;
		
		
	const {actions, course} = this.props;
	NEXTActions.fetchAddMyCourse(actions, course.id);
}
renderApply() {
		console.log(this.props);

    const {  name, id} = this.props.course;	
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
    const {  name, id , professor} = this.props.course;
	return (
   <Link to={"/course/"+ id} className="course-title">
    	<p className="course-title-name">{name}</p>
    	{(professor)?(
	<p className="course-professor-name">{professor.name}</p>
	) : ""}
    	<span className="course-card-options">
    		<i className="fa fa-star-o"></i>
    	</span>
	</Link>
        )
}
  render() {
  	const {isLink} = this.props;
    
    return (
      <li className="course-card col-xs-12 col-sm-6 col-md-3">
		{
			isLink?this.renderLink():this.renderApply()
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
