import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'


import PDFLoader from '../class/PDFLoader.js'

import Page from "../components/issue/PDFPage"
import Comments from "../components/issue/Comments"


import SimpleMDE from 'simplemde';
import "./css/View.css"

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
		document.body.onscroll = this.refreshView;
		window.onresize = this.refreshView;
		const {actions, id} = this.props;
		document.body.className="pdf-open";
		
		NEXTActions.fetchAbout(actions, {type:"get", target:"issue", body:"id=" + id});
		const self = this;
		
		
		this.pdfjs = new PDFLoader("/lec02a.pdf");
		this.pdfjs.init().then(() => {
			self.setState({pdf_load:true});
		});
            
	}
	componentWillUnmount() {
		document.body.className="";
		document.body.onscroll = "";
		window.onresize = "";
	}
	
	addZoom = () => {
		this.pdfjs.addZoom().then(() => {
			this.refreshView();
		});
	}
	minusZoom = () => {
		this.pdfjs.minusZoom().then(() => {
			this.refreshView();
		});		
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
		
		
		this.refs.wrapper.style.marginRight = this.option.tab_width +"px";
	}
	
	addFinishLoadCount = () => {
		if(this.state.is_finish_load)
			return;
			
			
		this.state.finish_load_count++;
		if(this.state.finish_load_count === this.pdfjs.numPages) {
			this.refreshView()
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

	refreshView = (e) => {
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

renderPages(pdfjs) {

	if(!pdfjs.numPages)
		return (<div></div>)
		

	return Array.from(Array(pdfjs.numPages).keys()).map(i=>(<Page pageNum={i+1} key={i+1} pdfjs={pdfjs} addFunc={this.addFinishLoadCount}/>))
}

componentDidMount() {
	const mde = new SimpleMDE({
		status:false,
		showIcons: ["code"],
		placeholder: "Type here...",
		hideIcons: ["guide", "italic", "fullscreen", "side-by-side","ordered-list", "preview"],		
		toolbar: false,
		previewRender: function(plainText) {
	        return plainText; // Returns HTML from a custom parser
	    },
	})
}
  render() {
  	if(!this.state.pdf_load)
  		return (<div></div>);
  		
    const html = (<div onDragOver={this.dragover}  >
    {this.renderButtons()}
    	<div className="issue-wrapper"  ref="wrapper">
	    	<div className="page-wrapper">
		    	{this.renderPages(this.pdfjs)}
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
