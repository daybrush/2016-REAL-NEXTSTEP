import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseCard from '../components/MainPage/CourseCard'
import "./css/Apply.css"

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
			<div>
	    	<section className="content">
		        <div className="page-header"><h3>강좌목록</h3></div>
		    	<ul className="course-cards">
		          {state.courses._embedded.courses.map(course =>
		            <CourseCard course={course} key={course.id} actions={actions} />
		          )}
		      </ul>
	      </section>
				<div className="content-btns">
					<a className="btn btn-more">더 보기</a>
				</div>
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
