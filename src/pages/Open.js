import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseCard from '../components/MainPage/CourseCard'
import CourseCardAdd from '../components/MainPage/CourseCard.add'

class Apply extends Component {
	componentWillMount() {
		const {actions} = this.props;


		actions.fetchGetCourses();
	}

  render() {
	const {state, actions} = this.props
    return (
	    <div>
	        <div className="page-header"><h3>개설한 강좌 목록</h3></div>
	    	<ul className="course-cards">
	          {state.courses.map(course =>
	            <CourseCard course={course} key={course.id} actions={actions} />
	          )}
	          <CourseCardAdd/>
	      </ul>
      </div>
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
