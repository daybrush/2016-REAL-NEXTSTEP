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
		hljs.highlightBlock(this.refs.content);
	}
	render() {
		const {discussion} = this.props
		const {creator, title, id, created} = discussion
		//					{title}
		return (
			<li className="discussion">
				<div className="dicussion-header">
					<img src={creator.avatar_url} alt="profile" className="discussion-author-thumb"/>
					<div className="dicussion-text">
						<p className="dicussion-author-name">{creator.name}</p>
						<p className="dicussion-time">{created}</p>
						</div>

				</div>
				<div className="discussion-content"  dangerouslySetInnerHTML={{__html:marked(this.discussion)}} ref="content">
				</div>
	    	</li>
	    )
	}
}