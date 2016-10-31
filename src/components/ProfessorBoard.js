import React, { Component, PropTypes } from 'react'
import CourseCard from './CourseCard'
import './css/ProfessorBoard.css'
import { Link } from 'react-router'


export default class ProfessorBoard extends Component {
  static propTypes = {
    instructor: PropTypes.object.isRequired,
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

    	</ul>
    	</div>

    )
    
    }
}
