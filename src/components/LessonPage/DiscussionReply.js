import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import marked from '../../js/custommarked';

import hljs from 'highlight.js'

export default class component extends Component {
	reply = "";
	componentWillMount() {
		this.reply = this.props.reply.comment;
		this.reply =  this.reply.replace(/\n/g, "<br/>");
	}
	componentDidMount() {
		hljs.highlightBlock(this.refs.content);
	}
	render() {
		const {reply} = this.props
		const {creator, id, created} = reply
		//					{title}
		return (
			<li className="discussion discussion-reply">
				<div className="dicussion-header">
					<img src={creator.avatar_url} alt="profile" className="discussion-author-thumb"/>
					<div className="dicussion-text">
						<p className="dicussion-author-name">{creator.name}</p>
						<p className="dicussion-time">{created}</p>
						</div>

				</div>
				<div className="discussion-content"  dangerouslySetInnerHTML={{__html:marked(this.reply)}} ref="content">
				</div>
	    	</li>
	    )
	}
}