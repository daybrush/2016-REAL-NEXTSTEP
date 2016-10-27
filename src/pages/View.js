import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'


import PDFLoader from '../class/PDFLoader.js'

import Page from "../components/issue/PDFPage"
import Comments from "../components/issue/Comments"


import marked from 'marked';
import "./css/View.css"

class Viewer extends Component {
	contentArray = [];
	content = ""
	
	
	
	state = {
		embed_load : false,
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
	
	addFinishLoadCount = (pdfjs) => {
		if(pdfjs.isFinishLoad()) {
			this.refreshView()
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
	_refreshView = (pdfjs) => {
		if(!pdfjs.isFinishLoad())
			return;
			
		let pageElem, rect, page;
		const windowHeight = window.innerHeight;
		for(let i = 1; i <= pdfjs.numPages; ++i) {
			page = pdfjs.getPage(i);
			pageElem = page.pageElem
			
	
			rect = pageElem.getBoundingClientRect();
			if(rect.top  <  windowHeight && rect.top > 0 || rect.bottom  <  windowHeight && rect.bottom > 0 ) {
				page.show();
			} else {
				page.hide();
			}
			
		}
	}
	refreshView = (e) => {
		this.contentArray.forEach(content => {
			if(content.type === "pdf") {
				this._refreshView(content.value);
			}
		});
			
	
	}
renderContents() {
	return this.contentArray.map((content,i) => {
		if(content.type === "html") {
			return (<div dangerouslySetInnerHTML={{__html:content.value}} key={i}></div>)
		}else if(content.type === "pdf") {
			if(!content.is_load)
				return "Loading....";
				
				
			return this.renderPages(content.value) 
		}		
		return "";
	});
}
renderPages(pdfjs) {

	if(!pdfjs.numPages)
		return ""
		

	return Array.from(Array(pdfjs.numPages).keys()).map(i=>(<Page pageNum={i+1} key={i+1} pdfjs={pdfjs} addFunc={this.addFinishLoadCount}/>))
}

componentWillUpdate(nextProps, nextState) {
	let content = nextProps.state.issue.content;
	

	if(this.content === content)
		return;
	

	this.content = content;
	let contentArray = content.split(/(\[embeded[pdf|video]+:[^\]]+\])/g);
	this.contentArray = contentArray.map((_content) => {
		let _contentArray = _content.split(/\[embeded(pdf|video):([^\]]+)\]/ig);

		if(_contentArray.length === 4) {
			const type = _contentArray[1];
			const url = _contentArray[2];
			let pdfjs = new PDFLoader("/lec02a.pdf");
			
			const state = {
				type : type,
				value : pdfjs,
				is_load : false,
			};
			
			pdfjs.init().then(() => {
				state.is_load = true;
				this.setState({embed_load:true})
			});
			return state;
		}


		return {
			type : "html",
			value : marked(_content)
		}		
	});


}
  render() {
    const html = (<div onDragOver={this.dragover}  >
    {this.renderButtons()}
    	<div className="issue-wrapper"  ref="wrapper">
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
	return {state: state.issue}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)
