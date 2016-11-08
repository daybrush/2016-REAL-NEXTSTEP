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
    	<ul className="course-list">
          {state.courses.map(course =>
            <CourseCard course={course} key={course.id} actions={actions} />
          )}
      </ul>
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
