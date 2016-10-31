import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import marked from '../../js/custommarked';

import hljs from 'highlight.js'

export default class component extends Component {
	discussion = "";
	componentWillMount() {
		this.discussion = this.props.discussion.content;
		this.discussion =  this.discussion.replace(/\n/g, "<br/>");
	}
	componentDidMount() {
		hljs.highlightBlock(this.refs.discussion);
	}
	render() {
		return (
			<li className="discussion" dangerouslySetInnerHTML={{__html:marked(this.discussion)}} ref="discussion">

	    	</li>
	    )
	}
}