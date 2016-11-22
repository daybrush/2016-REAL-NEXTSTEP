import React, { Component } from 'react'
import * as NEXTActions from '../actions/Lesson'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'


import PDFLoader from '../class/PDFLoader.js'
import Slide from '../components/LessonPage/Slide'
import Video from '../components/LessonPage/Video'
import Html from '../components/LessonPage/Html'

import Discussions from "../components/LessonPage/Discussions"


import marked from '../js/custommarked';
import "./css/LessonPage.css"
import "highlight.js/styles/default.css"
import hljs from 'highlight.js'


import { Link } from 'react-router'


import StoreSession from "../class/StoreSession"


class component extends Component {
	contentArray = [];
	content = ""
	
	
	
	state = {
		embed_load : false,
		scale : 1,
		tab : 1
		
	}
	option = {
		tab_width : 300,
		drag_start_x : 0,
		now_width : 300
	}
	componentWillMount() {
		document.body.onscroll = this.refreshView;
		window.onresize = this.refreshView;
		const {actions, params} = this.props;
		
		const {id} = params;
		
		
		document.body.className="pdf-open";
		
		actions.fetchGetLesson(id).then(result => {
			const {id, name} = result.lesson.course
			StoreSession.getStore("header").state.btns.leftSide = (<div className="aside-left"><Link to={"/course/" + id }>{name}</Link></div>)
			StoreSession.getStore("header").setState({update:true})
			
		})

	}
	componentWillUnmount() {
		document.body.className = "";
		document.body.onscroll = "";
		delete StoreSession.getStore("header").state.btns.leftSide
		StoreSession.getStore("header").setState({update:true})
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
				content.zoom && content.zoom(scale)
				break;
			default:
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
		if(option.tab_width  < 0)
			this.resizeView(0)
		else
			this.refs.wrapper.style.marginRight = (this.option.tab_width + 50) +"px";
	}
	
	resizeView = (width) => {
		this.option.tab_width = width;
		this.refs.tabwrapper.style.width = width + "px";
		this.refs.wrapper.style.marginRight =( width+ 50) +"px";		
	}
 	
	
	

	_refreshView = (content, now) => {
		if(now && now.name)
			return;


			
		let element, rect, page;
		element = content.element
		
		if(!element)
			return;
			
			
		const windowHeight = window.innerHeight;
			
	
		rect = element.getBoundingClientRect();
		if((rect.top  <=  windowHeight && rect.bottom > 0) || (rect.bottom  <  windowHeight && rect.bottom > 0 )) {
			content.component.refreshView && content.component.refreshView(now)
			
		}
	}
	refreshView = (e) => {
		let now = {
			value : "",
			name : ""
		}
		
		this.contentArray.forEach(content => {
			if(!content)
				return;
				
			this._refreshView(content, now);
		});
		
		console.log("NOW - " + now.name + "-" + now.value);
	}

	componentWillUpdate(nextProps, nextState) {
		let content = nextProps.state.lesson.content;
	
		if(this.content === content)
			return;
		
	

		let contentArray = content.split(/(\[embeded[pdf|video]+:[^\]]+\])/g);
		
		this.contentArray = contentArray.map((_content) => {
			// [ embeded[video,pdf,...]:url(:position???)]
			let _contentArray = _content.split(/\[embeded(pdf|video):([^\]:]+):*([^\]]*)\]/ig);
	
			if(_contentArray.length === 5) {
				const type = _contentArray[1];
				let id = _contentArray[2];
				const position = _contentArray[3];
				let value = id;
				if(type === "pdf")
					value = new PDFLoader(id);
				
				

				const state = {
					id : id,
					type : type,
					value : value,
					position: position,
					is_load : false,
				};
				
				return state;
			}
			if(_content === "")
				return "";
				
				
			return {
				id : "html",
				type : "html",
				value : marked(_content)
			}		
		});
	}
	componentDidUpdate(nextProps, nextState) {
		let content = nextProps.state.lesson.content;
		
		if(this.content === content)
			return;
		
	
		this.content = content;
		
		
		
		const codes = document.querySelectorAll(".page-wrapper pre code")
		console.log("codes", codes)
		for(let i =0; codes[i]; ++i) {
			hljs.highlightBlock(codes[i]);
		}
	}
	showTab = (tab) => {
		if(this.option.tab_width < 300)
			this.resizeView(300)
			
		this.setState({tab:tab})
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
			if(!content)
				return "";
				
				
			if(content.type === "html") {
				return (<Html content={content} key={i} scale={this.state.scale} refreshView={this.refreshView}/>)
			}else if(content.type === "pdf") {					
				return (<Slide content={content} key={i} scale={this.state.scale} refreshView={this.refreshView}/>);
			} else if(content.type === "video") {
				return (<Video content={content} key={i} scale={this.state.scale} refreshView={this.refreshView}/>);
			}
			
			return ""
		});
	}
	renderTab() {
		switch(this.state.tab) {
		case 2:
			return this.renderLinkTab()
		default:
			return this.renderDiscussionTab()
		}
	}
	renderLinkTab() {
		const codes = [].slice.call(document.querySelectorAll(".page-wrapper .hljs"));
		return (
			<div className="link-tab">
				<div className="link-wrapper">
					<ul>
						{this.contentArray.map((content,i) => {
							if(!content.id || content.id === "html")
								return "";
							return (<li key={content.id}>{content.id}</li>)
						
						})}
						{codes.map((pre,i) => {
							return (<li key={i} dangerouslySetInnerHTML={{__html:pre.outerHTML}} ></li>)
						})
						}
					</ul>
					<div className="upload-wrapper">
						<p className="glyphicon glyphicon-plus"></p>
						<p>업로드할 파일을 선택해주세요.</p>
					</div>
				</div>
			</div>
		)
	}
	renderDiscussionTab() {
		if(this.props.state.lesson.id < 0)
			return ""
			
		return (<Discussions lessonId={this.props.params.id} resizeView={this.resizeView} contents={this.contentArray} option={this.option}/>)
	}
	render() {
	    const html = (<div onDragOver={this.dragover}  >
	    {this.renderButtons()}
	    	<div className="lesson-wrapper"  ref="wrapper">
		    	<div className="page-wrapper">
		    		{this.renderContents()}
		    	</div>
		    </div>
	    	<div className="tab-wrapper" ref="tabwrapper">
	    		<ul className="tabs" ref="tab-mover" draggable="true" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend} >
	    			{[1,2].map((tab, i) => (
			    		<li onClick={()=>{this.showTab(tab)}} key={i} className={classNames({"selected":this.state.tab === tab})}></li>	
	    			))}
	    			
	    		</ul>
	    		<div className="tab-contents">
			    	{this.renderTab()}
		    	</div>
	    	</div>
	    </div>
	     
	    )
	    
	
	    
	    return html;
	}
	  
	  
}


const mapStateToProps = state => {
	return {state: state.Lesson}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)