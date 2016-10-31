import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import marked from '../../js/custommarked';

import hljs from 'highlight.js'

export default class component extends Component {
	comment = "";
	componentWillMount() {
		this.comment = this.props.comment.content;
		this.comment =  this.comment.replace(/\n/g, "<br/>");
	}
	componentDidMount() {
		hljs.highlightBlock(this.refs.comment);
	}
	render() {
		return (
			<li className="comment" dangerouslySetInnerHTML={{__html:marked(this.comment)}} ref="comment">

	    	</li>
	    )
	}
}