import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import marked from '../../js/custommarked';
import hljs from 'highlight.js'
import 'time-elements';
import "./css/Discussion.css"

export default class component extends Component {
	comment = "";
	componentWillMount() {
		this.comment = this.props.discussion.comment;
		this.comment =  this.comment.replace(/\n/g, "<br/>");
		this.props.discussion.createdDate += "+09:00"

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
		const {discussion, nowDiscussion} = this.props
		let {id,createdDate} = discussion
		const {avatarUrl, name} = discussion.createdBy
		//					{title}

		return (
			<li className={classNames({
					"discussion": true,
					"discussion-selected" : id === nowDiscussion
				})} onClick={this.onClick}>
				<div className="dicussion-header">
					<img src={avatarUrl} alt="profile" className="discussion-author-thumb"/>
						<div className="dicussion-text">
								<p className="dicussion-author-name">{name}</p>
								<p className="middle-dot">·</p>
								<p className="dicussion-time"><relative-time datetime={createdDate}></relative-time></p>
						</div>
				</div>
					<div className="discussion-content"  dangerouslySetInnerHTML={{__html:marked(this.comment)}} ref="content">
					</div>
	    </li>
	    )
	}
}
