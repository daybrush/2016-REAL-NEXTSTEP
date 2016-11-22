import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard'

class Apply extends Component {
	componentWillMount() {
		const {actions} = this.props;


		actions.fetchGetCourses();
	}

  render() {
	const {state, actions} = this.props
    return (
	    <section>
	        <div className="page-header"><h3>강의 신청하기</h3></div>
	    	<ul className="course-cards">
	          {state.courses.map(course =>
	            <CourseCard course={course} key={course.id} actions={actions} />
	          )}
	      </ul>
      </section>
    )
  }
}


const mapStateToProps = state => {
	return {state: state.Apply}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Apply)
