import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



class component extends Component {


render() {

    return (
    	<div className="pdf-comments-wrapper">
	    	<div className="pdf-comments">
	    		<ul>
	    			<li></li>
	    		</ul>
	    	</div>
	    	<div className="pdf-comment-form">
	    		INPUT
	    	</div>
    	</div>
    )
  }
}

const mapStateToProps = state => {
	return {state: state.MyLectures}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
