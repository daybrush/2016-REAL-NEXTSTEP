import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'

import {JSLoad} from '../js/Loader.js'
import PDFLoader from '../class/PDFLoader.js'

import Page from "../components/issue/PDFPage"
import Comments from "../components/issue/Comments"

import "./css/PDFViewer.css"

class Viewer extends Component {
	pdfjs = "";
	
	state = {
		pdf_load : false,
		is_finish_load : false,
		finish_load_count : 0
	}
	option = {
		tab_width : 300,
		drag_start_x : 0,
		now_width : 300
	}
	componentWillMount() {
		document.body.onscroll = this.showInnerView;
		window.onresize = this.showInnerView;
		const {actions, id} = this.props;
		document.body.className="pdf-open";
		
		NEXTActions.fetchAbout(actions, {type:"get", target:"issue", body:"id=" + id});
		const self = this;
		
		JSLoad("/js/pdf.js").then((js) => {
			self.pdfjs = new PDFLoader("/lec02a.pdf");
			self.pdfjs.init().then(() => {
				self.setState({pdf_load:true});
			});
		});
            
	}
	componentWillUnmount() {
		document.body.className="";
		document.body.onscroll = "";
		window.onresize = "";
	}
	
	addZoom = () => {
		this.pdfjs.addZoom();
	}
	minusZoom = () => {
		this.pdfjs.minusZoom();		
	}
	
	dragstart = e => {
		this.option.drag_start_x = e.clientX;
	}
	
	dragover = e => {
		const option = this.option;
		let width = option.tab_width + option.drag_start_x - e.clientX;
		
		if(width === option.now_width)
			return;
		this.refs.tabwrapper.style.width = width + "px";
		
		option.now_width = width;
	}
	
	dragend = e => {
		const option = this.option;
		option.tab_width = option.now_width;
		
		
		this.refs.pagewrapper.style.marginRight = this.option.tab_width +"px";
	}
	
	addFinishLoadCount = () => {
		if(this.state.is_finish_load)
			return;
			
			
		this.state.finish_load_count++;
		if(this.state.finish_load_count === this.pdfjs.numPages) {
			this.showInnerView()
			this.state.is_finish_load = true;
		}
	}
	
	
	renderButtons() {
		return (
			<div className="pdf-btn-wrapper">
				<a className="pdf-btn btn btn-default" role="button" onClick={this.addZoom}>+</a>
				<a className="pdf-btn btn btn-default" role="button" onClick={this.minusZoom}>-</a>
				<a className="pdf-btn btn btn-default" role="button">꽉</a>
			</div>
		)
	}

showInnerView = (e) => {
	if(!this.state.pdf_load)
		return;

	const windowHeight = window.innerHeight;
	
	let pageElem, rect, page;
	for(let i = 1; i <= this.pdfjs.numPages; ++i) {
		page = this.pdfjs.getPage(i);
		pageElem = page.pageElem
		

		rect = pageElem.getBoundingClientRect();
		if(rect.top  <  windowHeight && rect.top > 0 || rect.bottom  <  windowHeight && rect.bottom > 0 ) {
			//console.log(i+"page", y, y2, rect.top, rect.bottom);
			page.show();
		} else {
			page.hide();
		}
		
	}

}

renderPages() {

	if(!this.pdfjs.numPages)
		return (<div></div>)
		

	return Array.from(Array(this.pdfjs.numPages).keys()).map(i=>(<Page pageNum={i+1} key={i+1} pdfjs={this.pdfjs} addFunc={this.addFinishLoadCount}/>))
}


  render() {
  	if(!this.state.pdf_load)
  		return (<div></div>);
  		
    const html = (<div onDragOver={this.dragover}  >
    {this.renderButtons()}
    	<div className="issue-wrapper" onScroll={this.scroll}>
	    	<div className="page-wrapper" ref="pagewrapper">
		    	{this.renderPages()}
	    	</div>
	    </div>
    	<div className="tab-wrapper" ref="tabwrapper">
    		<div className="tab-mover" draggable="true" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend} ></div>
    		<ul className="tabs">
    			<li></li>
    			<li></li>
    			<li></li>    			
    		</ul>
	    	<Comments/>
    	</div>
    </div>
     
    )
    

    
    return html;
  }
  
  
}


const mapStateToProps = state => {
	return {state: state.issue}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)
