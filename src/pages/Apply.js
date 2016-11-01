import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProfessorList from '../components/ProfessorList'

class Apply extends Component {
	componentWillMount() {
		const {actions} = this.props;


		actions.fetchGetCourses();
	}

  render() {
	const {state} = this.props
    return (
        <ProfessorList instructors={state.instructors}/>
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
