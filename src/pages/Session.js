import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'


import PDFLoader from '../class/PDFLoader.js'
import PDFPages from '../components/session/PDFPages'
import Video from '../components/session/Video'

import Comments from "../components/session/Comments"


import marked from 'marked';
import "./css/Session.css"
import "highlight.js/styles/default.css"
class Viewer extends Component {
	contentArray = [];
	content = ""
	
	
	
	state = {
		embed_load : false,
		scale : 1
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
		
		NEXTActions.fetchAbout(actions, {type:"get", target:"session", body:"id=" + id});    
	}
	componentWillUnmount() {
		document.body.className="";
		document.body.onscroll = "";
		window.onresize = "";
	}
	
	addZoom = () => {
		let scale = this.state.scale + 0.2;
		this.zoom(scale);
	}
	minusZoom = () => {
		let scale = this.state.scale - 0.2;
		if(scale <= 0)
			scale = 0.2;
			
			
		this.zoom(scale);
		
	}
	zoom = (scale) => {			
		this.contentArray.forEach((content,i) => {
			switch(content.type) {
			case "pdf":
				content.value.zoom(scale).then(() => {
					this.refreshView();
				})
				break;
			}
		});
		
		this.setState({scale:scale});
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
	
	resizeView = (width) => {
		this.refs.tabwrapper.style.width = width + "px";
		this.refs.wrapper.style.marginRight = this.option.tab_width +"px";		
	}
 	
	addFinishLoadCount = (pdfjs) => {
		if(pdfjs.isFinishLoad()) {
			this.refreshView()
		}
	}
	
	

	_refreshView = (pdfjs, now) => {
		if(!pdfjs.isFinishLoad())
			return;
			
		let pageElem, rect, page;
		const windowHeight = window.innerHeight;
		for(let i = 1; i <= pdfjs.numPages; ++i) {
			page = pdfjs.getPage(i);
			pageElem = page.pageElem
			
	
			rect = pageElem.getBoundingClientRect();
			if(rect.top  <=  windowHeight && rect.bottom > 0 || rect.bottom  <  windowHeight && rect.bottom > 0 ) {
				page.show();
				if(now && now.page === 0) {
					now.page = i;
					now.value = pdfjs.fileName +" - " + i + " / " + pdfjs.numPages;
				}
			} else {
				page.hide();
			}
			

		}
	}
	refreshView = (e) => {
		let now = {
			page : 0,
			value : ""
		}
		this.contentArray.forEach(content => {
			if(content.type === "pdf") {
				this._refreshView(content.value, now);
			}
		});
		
		console.log("NOW - " + now.value);
	}

	componentWillUpdate(nextProps, nextState) {
		let content = nextProps.state.session.content;
		
	
		if(this.content === content)
			return;
		
	
		this.content = content;
		let contentArray = content.split(/(\[embeded[pdf|video]+:[^\]]+\])/g);
		
		this.contentArray = contentArray.map((_content) => {
			// [ embeded[video,pdf,...]:url(:position???)]
			let _contentArray = _content.split(/\[embeded(pdf|video):([^\]:]+):*([^\]]*)\]/ig);
	
			if(_contentArray.length === 5) {
				const type = _contentArray[1];
				const url = _contentArray[2];
				const position = _contentArray[3];
				let value;
				if(type === "pdf")
					value = new PDFLoader(url);
				else
					value = url;
				
				const state = {
					type : type,
					value : value,
					position: position,
					is_load : false,
				};
				
				return state;
			}
	
			return {
				type : "html",
				value : marked(_content)
			}		
		});
	}
	
	renderButtons() {
		return (
			<div className="btn-wrapper">
				<a className="btn btn-default" role="button" onClick={this.addZoom}>+</a>
				<a className="btn btn-default" role="button" onClick={this.minusZoom}>-</a>
				<a className="btn btn-default" role="button">꽉</a>
			</div>
		)
	}
		
		
	renderContents() {
		return this.contentArray.map((content,i) => {
			if(content.type === "html") {
				return (<div className="html-page" key={i}>
					<div className="html-page-inner"  style={{transform:"scale("+this.state.scale+")"}} dangerouslySetInnerHTML={{__html:content.value}} >
					</div>
				</div>)
			}else if(content.type === "pdf") {					
				return this.renderPages(content, i) 
			} else if(content.type === "video") {
				return (<Video state={content} key={i}/>);
			}
			return "";
		});
	}
	renderPages(state, key) {
		return (<PDFPages state={state} addFunc={this.addFinishLoadCount} key={key}/>);
	}
	renderVideo(state, key) {
		
	}	
	render() {
	    const html = (<div onDragOver={this.dragover}  >
	    {this.renderButtons()}
	    	<div className="session-wrapper"  ref="wrapper">
		    	<div className="page-wrapper">
		    		{this.renderContents()}
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
	return {state: state.Session}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)
