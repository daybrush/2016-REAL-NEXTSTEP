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
		const codes = this.refs.content.querySelectorAll("pre code")
		for(let i =0; codes[i]; ++i) {
			hljs.highlightBlock(codes[i]);
		}
	}
	trace = (id, position) => {
		this.props.contents.forEach(content => {
			if(content.id !== id)
				return;
			
			content.component.trace && content.component.trace(position);
			
			document.body.scrollTop += content.element.getBoundingClientRect().top
			
		})
	}
	onClick = (e) => {
		const target = e.target;
		if(e.target.className === "mark-goto") {
			this.trace(target.getAttribute("filename"), target.getAttribute("position"))
			
			return;
		}
		this.props.onClick(this.props.discussion)
	}
	render() {
		const {discussion} = this.props
		const {creator, title, id, created} = discussion
		//					{title}
		const nowDiscussionId = this.props.nowDiscussion
		return (
			<li className={classNames({
					"discussion": true,
					"discussion-selected" : id === nowDiscussionId
				})} onClick={this.onClick}>
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