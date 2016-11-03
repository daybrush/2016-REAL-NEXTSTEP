import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export default class component extends Component {

	state = {
		is_load : false
	}
	componentWillMount() {
		const content = this.props.content, url = content.value;
		content.is_load = true;
	}
	componentDidMount() {
		const content = this.props.content
		content.component = this
		content.element = this.refs.video
	}
	refreshView = (now) => {
		let nowTime = 0 , finishTime ="1:00:00"
		now.name = "video name test"
		now.value = nowTime + "/" + finishTime
	}
	
	
	render() {
		const url = this.props.content.value;
		return (
		<video width="320" height="240" className="session-video" ref="video" controls>
			<source src={url} type="video/mp4"/>
			<source src={url} type="video/ogg"/>
			Your browser does not support the video tag.
		</video>
		)
	}
}
