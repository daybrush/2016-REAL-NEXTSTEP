import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'

export default class component extends Component {

	state = {
		numPages : 0,
		nowPage : 1,
		is_load : false,
		scale : 1,
		pdfjs : 0,
		id : -1
	}
	componentDidMount() {
		const content = this.props.content, pdfjs = content.value
		
		this.state.id = content.id
		this.state.pdfjs = pdfjs
		
		pdfjs.init().then(() => {
			content.is_load = true;
			this.state.numPages = pdfjs.numPages
			this.setState({is_load:true})
			pdfjs.loadPage(this.state.nowPage,  this.state.scale, this.refs.page)
		});
		
		content.component = this
		content.element = this.refs.slide
	}
	refreshView = (now) => {
		now.name =  this.props.content.value.fileName;
		now.value = this.state.nowPage + "/" + this.state.numPages
	}
	prevSlide = () => {
		this.state.nowPage--;
		if(this.state.nowPage < 1)
			this.state.nowPage = 1;
			
		this.trace(this.state.nowPage)
	}
	nextSlide = () => {
		this.state.nowPage++;
		if(this.state.nowPage > this.state.numPages)
			this.state.nowPage = this.state.numPages

		this.trace(this.state.nowPage)

	}
	trace = (position) => {
		position = parseInt(position)
		this.setState({nowPage:position});
		this.state.pdfjs.loadPage(position, this.state.scale, this.refs.page)
	}
	onClick = (e) => {

	}
	renderLoading() {
		if(this.state.is_load)
			return "";
			
		return(<div className="loading">
			
		</div>)
	}
	render() {
		return (
		<div className="slide-page" ref="slide" data-pages-number={this.state.numPages}>
			{this.renderLoading()}
			<div className="pdf-page" ref="page" style={{display:this.state.is_load?"block":"none"}}>
				<canvas className="canvas-layer" onClick={this.onClick}></canvas>
				<div className="text-layer" onClick={this.onClick}></div>
				<div className="slide-control">
						<button className="glyphicon glyphicon-menu-left" onClick={this.prevSlide}/>
						<span className="slide-control-number">{this.state.nowPage} / {this.state.numPages}</span>
						<button className="glyphicon glyphicon-menu-right" onClick={this.nextSlide} />
				</div>
			</div>
		</div>
		)
	}
	zoom = (_scale) => {
		const {nowPage, scale, pdfjs} = this.state

		if(scale === _scale)
			return;
		

			
		this.state.scale = _scale
		
		pdfjs.zoom(nowPage, _scale, this.refs.page).then(() => {
			this.props.refreshView();
		})
	}
}
