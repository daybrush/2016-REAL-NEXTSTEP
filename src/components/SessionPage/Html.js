import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export default class component extends Component {

	state = {
		is_load : false,
		initScale : 1,
	}
	componentWillMount() {
		const content = this.props.content, url = content.value;
		this.content.initScale = this.props.scale;
		
		content.is_load = true;
	}
	componentWillMount() {
	}
	componentDidMount() {
		this.refresh();
		this.props.content.component = this
		this.props.content.element = this.refs.html
	}
	componentDidUpdate() {
		this.refresh();		
	}
	refresh = () => {
		const innerElement = this.refs.inner, htmlElement = this.refs.html;
		const rect = innerElement.getBoundingClientRect();	
		htmlElement.style.width = rect.width +"px";;
		htmlElement.style.height = rect.height +"px";	
	}
	render() {
		const content = this.props.content.value, scale = this.props.scale;
		return (
			<div className="html-page" ref="html">
				<div className="html-page-inner"  style={{transform:"scale("+scale+")"}} dangerouslySetInnerHTML={{__html:content}} ref="inner">
				</div>
			</div>
		)
	}

}
