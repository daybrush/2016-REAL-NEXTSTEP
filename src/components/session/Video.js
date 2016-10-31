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
		const state = this.props.state, url = state.value;
		state.is_load = true;
	}
	render() {
		const url = this.props.state.value;
		return (
		<video width="320" height="240" className="session-video" controls>
			<source src={url} type="video/mp4"/>
			<source src={url} type="video/ogg"/>
			Your browser does not support the video tag.
		</video>
		)
	}
	componentWillMount() {
		const state = this.props.state, url = state.value;
	}
}
