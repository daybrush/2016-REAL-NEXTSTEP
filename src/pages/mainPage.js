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

import LoginSession from "../class/LoginSession"
class mainPage extends Component {
	componentWillMount() {
		document.body.className = "";

		this.loadMyCourses(true);

	}
	componentWillUpdate() {
		this.loadMyCourses();
	}
	loadMyCourses = (is_update = false) => {
		if(!LoginSession.isLogin())
			return;

		if(!is_update && this.props.state.courses)
			return;

		this.props.actions.fetchGetMyCourses({
			id: this.props.state2.login.userId
		})
	}

	renderMyCourses() {
		if(!LoginSession.isLogin())
			return;
		if(!this.props.state.courses)
			return;

		return (<ul className="course-cards">
			{this.props.state.courses.map((course, i) => (
				<CourseCard isLink="true" course={course} key={course.id} />
			))}
		</ul>)
	}
  render() {

	const _Open = (this.props.state2.login.role === "ROLE_INSTRUCTOR"  || this.props.state2.login.role === "ROLE_ADMIN") ? (<Open/>) : ""
    return (
    	<section className="content">
    		{_Open}
    		<div className="page-header"><h3>수강목록</h3><Link className="btn btn-apply" to="/apply">강좌 찾아보기</Link></div>
    		{this.renderMyCourses()}
        </section>
    )
  }
}


const mapStateToProps = state => {
	return {state: state.MyCourses, state2: state.Login}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(mainPage)
