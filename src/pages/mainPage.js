import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import ProfessorList from '../components/ProfessorList'
//import Apply from './Apply'
import CourseCard from '../components/MainPage/CourseCard'
import Open from './Open'
import "./css/mainPage.css"

import {Link} from 'react-router'
class mainPage extends Component {
	componentWillMount() {
		const {actions} = this.props;

		document.body.className = "";
		
		actions.fetchGetMyCourses()
		
	}

  render() {
	const {state} = this.props

		
    return (
    	<section className="content">
    		<Open/>
    		<div className="page-header"><h3>수강 목록</h3></div>
    		<ul className="course-cards">
    		{state.courses.map((course, i) => (
    			
    			<CourseCard isLink="true" course={course} key={course.id} />
    		))}
    		</ul>
    		<div className="content-btns">
	    		<Link className="btn btn-apply" to="/apply">강좌 찾아보기</Link>
    		</div>
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
