import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import marked from '../../js/custommarked';

import hljs from 'highlight.js'
import 'time-elements';


export default class component extends Component {
	comment = "";
	componentWillMount() {
		this.comment = this.props.discussion.comment.replace(/\n/g, "<br/>");
		this.props.discussion.createdDate += "+09:00"
	}
	componentWillUpdate() {
		this.comment = this.props.discussion.comment.replace(/\n/g, "<br/>");
	}
	componentDidMount() {
		hljs.highlightBlock(this.refs.content);
	}
	componentDidUpdate() {
		hljs.highlightBlock(this.refs.content);
	}
	render() {
		const {discussion, nowDiscussion} = this.props
		let {id,createdDate} = discussion
		const {avatarUrl, name} = discussion.createdBy


		return (
			<li className={classNames({
					"discussion": true,
					"discussion-reply" : true
				})} onClick={this.onClick}>
				<div className="dicussion-header">
					<img src={avatarUrl} alt="profile" className="discussion-author-thumb"/>
					<div className="dicussion-text">
						<p className="dicussion-author-name">{name}</p>
						
						<p className="dicussion-time"><relative-time datetime={createdDate}></relative-time></p>
					</div>
				</div>
				<div className="discussion-content"  dangerouslySetInnerHTML={{__html:marked(this.comment)}} ref="content">
				</div>
	    	</li>
	    )
	}
}