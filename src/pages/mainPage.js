import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProfessorList from '../components/ProfessorList'
import Apply from './Apply'
import CourseCard from '../components/CourseCard'

class mainPage extends Component {
	componentWillMount() {
		const {_actions, actions} = this.props;

		document.body.className = "";
		
		actions.fetchGetMyCourses()
		
	}

  render() {
	const {state, actions} = this.props
    return (
    	<section className="content">
    		<div className="page-header"><h3>신청한 강의 목록</h3></div>
    		<ul className="course-list">
    		{state.courses.map((course, i) => (
    			
    			<CourseCard isLink="true" course={course} key={course.id} />
    		))}
    		</ul>
    		
    		<div className="page-header"><h3>강의 신청하기</h3></div>
        <Apply/>
        </section>
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
)(mainPage)
