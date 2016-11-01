import React, { Component, PropTypes } from 'react'
import CourseCard from './CourseCard'
import * as NEXTActions from '../actions/Course'
import './css/ProfessorBoard.css'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default connect(
  state => ({state: state.MyCourses}),dispatch => ({  actions: bindActionCreators(NEXTActions, dispatch), dispatch})
)(
class ProfessorBoard extends Component {
  static propTypes = {
    instructor: PropTypes.object.isRequired,
  }
  
  
  
  more = () => {
	const {actions, instructor} = this.props
	
	actions.fetchGetCoursesMore(instructor.id);
  }

  renderHeader() {
    const { id, name } = this.props.instructor
	return (
	 <div className="professor-board-header">
		 <h3 className="professor-board-header-name"><span className="glyphicon glyphicon-user"></span> <Link to={"/professor/" + id}>{name}</Link></h3>
	 </div>
	)  
  }

  render() {
    const { courses, name, actions } = this.props.instructor

    return (
    	<div className="professor-board">
    	{this.renderHeader()}  
    	<ul className="course-list">
          {courses.map(course =>
            <CourseCard course={course} key={course.id} actions={actions} />
          )}
          
          <li className="course-card course-card-more col-xs-12 col-sm-6 col-md-3">
          	<a onClick={this.more}>MORE CLOSED</a>
          </li>

    	</ul>
    	</div>

    )
    
    }
}
)