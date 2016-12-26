import React, { Component } from 'react'
import * as NEXTActions from '../actions/Lesson'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'


import PDFLoader from '../class/PDFLoader.js'
import LinkTab from '../components/LessonPage/LinkTab'
import Slide from '../components/LessonPage/Slide'
import Video from '../components/LessonPage/Video'
import Html from '../components/LessonPage/Html'

import Discussions from "../components/LessonPage/Discussions"


import marked from '../js/custommarked';
import "./css/LessonPage.css"
import "highlight.js/styles/default.css"
import hljs from 'highlight.js'


import { Link } from 'react-router'

import loadPage from "../class/Page"

import StoreSession from "../class/StoreSession"
import LoginSession from "../class/LoginSession"


import SimpleMDE from 'simplemde';
class component extends Component {
	static contextTypes =  {
	    router: React.PropTypes.object.isRequired
	  }
	contentArray = [];
	content = ""
	
	
	
	state = {
		embed_load : false,
		scale : 1,
		tab : 1,
		is_edit: false,
		
	}
	option = {
		tab_width : 300,
		drag_start_x : 0,
		now_width : 300
	}
	
	memberStatus = "LOADING"
	
	componentWillMount() {
		document.body.onscroll = this.refreshView;
		window.onresize = this.refreshView;
		const {actions, params} = this.props;
		
		const {course, lesson, type} = params;
		
		
		document.body.className="pdf-open";
		

		actions.fetchGetLesson(lesson).then(result => {
			const lesson = result.value;
			const {name} = lesson.lecture

			StoreSession.getStore("header").addButton({
				leftSide:(<div key="left-side" className="aside-left-lesson-back"><Link to={"/" + course }>
				<i className="glyphicon glyphicon-menu-left"></i>{name}</Link></div>)
			})
			if(type === "edit") {
				this.editMode();
			}
			actions.fetchGetEnrollmentsInLesson({
				id: lesson.id,
// 				url : lesson.lecture._links.session 
			}).then(result => {
				this.memberStatus = this.getMemberStatus(result.value)
			})
			
		}).catch(e => {
			console.error(e)
		})

	}
	componentWillUnmount() {
		document.body.className = "";
		document.body.onscroll = "";
		delete StoreSession.getStore("header").state.btns.leftSide
		StoreSession.getStore("header").setState({update:true})
		window.onresize = "";
	}
	
	addZoom = (e) => {
		let scale = this.state.scale + 0.2;
		this.zoom(scale);
	}
	minusZoom =(e) =>{
		let scale = this.state.scale - 0.2;
		if(scale <= 0)
			scale = 0.2;
			
			
		this.zoom(scale);
		
	}
	zoom(scale) {			
		this.contentArray.forEach((content,i) => {
			switch(content.type) {
			case "pdf":
				if(!content.component.zoom)
					break;
					
				content.component.zoom(scale)
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


			
		let element, rect
		element = content.element
		
		if(!element)
			return
			
			
		const windowHeight = window.innerHeight;
			
	
		rect = element.getBoundingClientRect();
		if((rect.top  <=  windowHeight && rect.bottom > 0) || (rect.bottom  <  windowHeight && rect.bottom > 0 )) {
			if(!content.component.refreshView)
				return
				
			content.component.refreshView(now)
			
		}
	}
	refreshView = (e) => {
		if(this.state.is_edit)
			return;
			
			
		let now = {
			value : "",
			name : ""
		}
		
		this.contentArray.forEach(content => {
			if(!content)
				return;
				
			this._refreshView(content, now);
			if(content.type === "html") {
				if(!content.component)
					return
					
				content.component.refresh()
			}
		});
		
		console.log("NOW - " + now.name + "-" + now.value);
	}
	getMemberStatus() {
		const lesson = this.props.state.lesson
		let memberStatus = "NOT_LOGIN"

		if(!LoginSession.isLogin())
			return memberStatus

  		//const loginInfo = LoginSession.getLoginInfo().user
  		
  		const is_instructor = lesson.authorities.filter(authority=>(authority.grantedAuthority === "COURSE_INSTRUCTOR")).length !== 0
  		if(is_instructor) {
  			memberStatus = "INSTRUCTOR"
  		} else {
	  		const is_participants = lesson.authorities.filter(authority=>(authority.grantedAuthority === "COURSE_PARTICIPANTS")) !== 0
	  		
	  		if(is_participants)
	  			memberStatus = "APPROVED"
	  		else
	  			memberStatus = "NOT"
  		}
	  	
	  	return memberStatus
	}

	componentWillUpdate(nextProps, nextState) {
		let content = nextProps.state.lesson.content || ""
	
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
	componentDidMount() {
		if(!this.mde) {
			this.mde = new SimpleMDE({
				element: this.refs.editcontent,
				status:false,
	    		showIcons: ["code"],
	    		placeholder: "Type here...",
			});
		}
		this.resizeView(300)
	}
	componentDidUpdate(nextProps, nextState) {
		
		
		let content = nextProps.state.lesson.content;
		
		if(this.content === content)
			return;
		
	
		this.content = content;
		
		
		
		const codes = document.querySelectorAll(".page-wrapper pre code")
		for(let i =0; codes[i]; ++i) {
			hljs.highlightBlock(codes[i]);
		}
		

		this.setState({load_mark:true});
	}
	showTab = (tab) => {
		if(this.option.tab_width < 300)
			this.resizeView(300)
			
		this.setState({tab:tab})
	}
	clickEdit = (e) => {
		e.preventDefault();
		if(this.memberStatus !== "INSTRUCTOR") {
			alert("노 교수")
			return
		}

		this.context.router.replace("/" + this.props.params.course +"/lesson/" + this.props.params.lesson + "/edit")
		this.editMode();

	}
	editMode = () => {
		this.setState({is_edit: true});
		console.log(this.props.state.lesson)
		this.refs.editname.value = this.props.state.lesson.name || ""
		this.mde.value(this.props.state.lesson.content || "")
		window.dispatchEvent(new Event("resize"))
	}
	saveEdit = () => {
		const name = this.refs.editname.value
		const content = this.mde.value()
		
		this.props.actions.saveLesson({
			name,
			content
		})
		
		this.props.actions.fetchSaveLesson({
			name,
			content,
			url: this.props.state.lesson._links.self.href
		}).then(e=> {
			alert("저장되었습니다.");
			this.cancelEdit();
		})
	}
	cancelEdit = () => {
		this.context.router.replace("/" + this.props.params.course +"/lesson/" + this.props.params.lesson)
		this.setState({is_edit: false});
	}
	renderButtons() {
		return (
			<div className="btn-wrapper">
				<a className="btn btn-default" role="button" onClick={this.addZoom}>+</a>
				<a className="btn btn-default" role="button" onClick={this.minusZoom}>-</a>
				<a className="btn btn-default" role="button">꽉</a>
				<a className="btn btn-default" role="button" onClick={this.clickEdit}>수정</a>
			</div>
		)
	}
	
	renderEdit() {
		const is_show  = this.state.is_edit ? "block" : "none"
		return (<div className="lesson-page-edit-area" style={{"display":is_show}}>
			<input ref="editname" className="lesson-page-edit-name"/>
			<textarea ref="editcontent" className="lesson-page-edit-content"></textarea>
			<div className="lesson-page-edit-btn-area">
				<button className="lesson-page-edit-save" onClick={this.saveEdit}>Save</button>
				<button className="lesson-page-edit-cancel" onClick={this.cancelEdit}>Cancel</button>
			</div>
		</div>)
	}
		
		
	renderContents() {
		if(!this.props.state.lesson) {
			return loadPage("loading")
		}
		
		const is_show  = this.state.is_edit ? "none" : "block"
		return (<div className="lesson-page-viewer" style={{"display":is_show}}>
			<div className="lesson-page-viewer-name">{this.props.state.lesson.name}</div>
			{this.contentArray.map((content,i) => {
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
			})
		}</div>)
	}
	renderTab() {
		if(!this.props.state.lesson)
			return;
			
		switch(this.state.tab) {
		case 2:
			return this.renderLinkTab()
		default:
			return this.renderDiscussionTab()
		}
	}
	renderLinkTab() {
		return (<LinkTab attachments={this.props.state.lesson.attachments}/>)
	}
	renderDiscussionTab() {
		if(!this.props.state.lesson)
			return ""
		if(this.props.state.lesson.id < 0)
			return ""
			
		return (<Discussions lesson={this.props.state.lesson} lessonId={this.props.params.lesson} resizeView={this.resizeView} contents={this.contentArray} option={this.option}/>)
	}
	render() {

	    const html = (<div onDragOver={this.dragover}  >
	    {this.renderButtons()}
	    	<div className="lesson-wrapper"  ref="wrapper">
		    	<div className="page-wrapper">
		    		{this.renderEdit()}
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