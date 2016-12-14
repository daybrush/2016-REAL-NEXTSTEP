import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseCard from '../components/MainPage/CourseCard'

class Apply extends Component {
	componentWillMount() {
		const {actions} = this.props;


		actions.fetchGetCourses();
	}

  render() {
	const {state, actions} = this.props
	
	if(!state.courses._embedded)
		return (<div>LOADING</div>);
		
		
		
    return (
    	<section className="content">
	        <div className="page-header"><h3>강좌 목록</h3></div>
	    	<ul className="course-cards">
	          {state.courses._embedded.courses.map(course =>
	            <CourseCard course={course} key={course.id} actions={actions} />
	          )}
	      </ul>
    		<div className="content-btns">
	    		<a className="btn btn-more">더 보기</a>
    		</div>
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
