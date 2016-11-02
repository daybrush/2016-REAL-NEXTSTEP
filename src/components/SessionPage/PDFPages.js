import React, { Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from "./PDFPage"


export default class component extends Component {

	state = {
		numPages : 0,
		is_load : false
	}
	componentWillMount() {
		this.pageNum = this.props.pageNum
		const state = this.props.state, pdfjs = state.value;
		pdfjs.init().then(() => {
			state.is_load = true;
			this.state.numPages = pdfjs.numPages
			
			
			this.setState({is_load:true})
		});
	}
	renderPages() {
		if(!this.state.is_load) {
			return "Loading....";
		}
		const state = this.props.state, pdfjs = state.value;
		const numPages = this.state.numPages
		
		return Array.from(Array(numPages).keys()).map(i=>(<Page pageNum={i+1} key={i+1} pdfjs={pdfjs} addFunc={this.props.addFunc}/>))
	}
	render() {
	
		return (
		<div className="pdf-pages" ref="pages" data-pages-number={this.state.numPages}>
			{this.renderPages()}		
		</div>
		)
	}
}
