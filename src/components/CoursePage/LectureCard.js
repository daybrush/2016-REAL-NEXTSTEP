import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import DragDrop from "../../class/dragdrop"
import LessonCard from "./LessonCard"
import StoreSession from "../../class/StoreSession"


import "./css/LectureCard.css"


export default connect(
	state => ({state: state.CoursePage}),
	dispatch => ({ actions: bindActionCreators(NEXTActions, dispatch), dispatch})
)
(class LectureCard extends Component {

	state = {
		drag : false,
		edit : false,
		menu : false,
		parent : "",
	}
	selector = ".course-session-lectures .lecture-card"
	dragndrop = new DragDrop(".course-session-lectures .lecture-card");
 
 
 componentWillMount() {
	 this.lecture = this.props.lecture
	 this.selector = this.props.is_master ? ".course-master-lectures .lecture-card" : ".course-session-lectures .lecture-card"
	 this.dragndrop.selector = this.selector
 }

dragover = (e) => {
	if(this.props.status !== "INSTRUCTOR")
		return;
	
	
	e.stopPropagation();
	
	
	const {card, content} = this.refs;
	
	this.dragndrop.dragover(e, card, content);

	if(!this.state.drag)
		return;

}
dragstart= (e) => {
	if(this.props.status !== "INSTRUCTOR")
		return;
		
	console.log("dragstart");
	this.setState({drag:true});
	
	const {card, content} = this.refs;
	this.dragndrop.dragstart(e,card,content);
	
	
	this.state.parent = card.parentNode


}
dragend = (e) => {
	if(!this.state.drag)
		return;
		
	this.setState({drag:false});
	
	const {card, content} = this.refs;
	
	const target = document.querySelector(this.selector + "[isdrag='1']")
	this.dragndrop.dragend(e, card, content);
	


	const lecture = this.props.lecture
	const elCards = document.querySelectorAll(".course-session-lectures .lecture-cards>.lecture-card"), length = elCards.length
	let elCard, position, is_sublecture = false
	
	const lecturePosition = this.props.position
	let cardPosition = -1;
	
	let pos = StoreSession.getStore("coursepage").position;
	for(let i = 0; i < length; ++i) {
		elCard = elCards[i]
		if(elCard === card) {
			cardPosition = i
			break
		} else if(elCard.contains(card)){
			cardPosition = i
			is_sublecture = true
			break
		}
	}

	
	let targetId = pos[lecturePosition], newPosition, sublecturePosition;
	if(cardPosition > -1) {
		if(targetId instanceof Array) {
			sublecturePosition = targetId.indexOf(lecture.id)
			
			if(sublecturePosition === -1)
				return
				
			targetId = targetId.slice(sublecturePosition, targetId.length)
		}
		
		pos = pos.map((id, i)=> {
			if(id instanceof Array) {
				let index = id.indexOf(lecture.id)
				if(index === -1)
					return id
				
				else if(index === 0)
					return lecture.id
				
				return id.filter((id, i) => (i<index))
			}
			return id
			
		}).filter((id, i) => (id !== lecture.id))
		
		if(is_sublecture) {
			if(!(pos[cardPosition] instanceof Array))
				pos[cardPosition] = [pos[cardPosition]]
				
			pos[cardPosition] = pos[cardPosition].concat(targetId)
		} else {
			pos.splice(cardPosition, 0, targetId)
		}
		
		pos = pos.map(id => {
			
			if(id instanceof Array) {
				if(id.length === 1)
					return id[0]	
			}
			
			return id
		})
		
	
		this.state.parent.insertAdjacentElement("beforeend", target)
		this.state.parent = ""
		
		
	
		this.props.dispatch(
	  		{
		  		type:"SAVE_LECTURE_POSITION",
		  		lecture_position : pos,
		  		params : {
			  		is_master : this.props.is_master
		  		}
	  		}
  		)
	}
}
dragsubover = (e) => {
	e.stopPropagation();
	if(this.props.status !== "INSTRUCTOR")
		return;
		
	const {card, content} = this.refs;
	
	const target = document.querySelector(this.selector + "[isdrag='1']")
	
	if(!target)
		return
		
		
	this.refs.sublecture.insertAdjacentElement("beforeend", target);

	

}
getNodeIndex = (node) => {
    var index = 0;
    while ( (node = node.previousSibling) ) {
        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            index++;
        }
    }
    return index;
}

showMenu = () => {
	this.setState({menu:true, edit: false});
	this.refs.menu_title.value = this.props.lecture.title
}
hideMenu = () => {
	this.setState({menu:false});
}
saveMenu = () => {
	this.hideMenu()
}
showEdit = () => {
	this.setState({edit:true});	
}
hideEdit = () => {
	this.setState({edit:false});	
}



addLesson = () => {
	console.log(this);
	const title = this.refs.title.value;
		this.props.actions.fetchAddLesson(this.props.course.id)
	this.setState({edit:false});
	//NEXTActions
}
renderEdit() {
	if(this.props.status !== "INSTRUCTOR")
		return;
		
	return (
	    <div className={classNames({"lesson-card-add":true,"lesson-card-add-show":this.state.edit})}>
			<span className="lesson-card-add-placeholder" onClick={this.showEdit}>Add a Lesson...</span>
			<div className="lesson-card-add-controls form-controls">
				<input type="text" ref="title" className="form-control" placeholder="Add a Lesson..."/>
				<button onClick={this.addLesson} className="btn btn-success">Add</button>
				<button onClick={this.hideEdit} className="btn btn-default btn-close">X</button>		
			</div>
	    </div>	
	)
}



renderMenu() {
	if(this.props.status !== "INSTRUCTOR")
		return;
		
		
	return (
		<div>
			<a className="lecture-card-menu-btn glyphicon glyphicon-option-horizontal" href="#" onClick={this.showMenu}></a>
			<div className={classNames({"lecture-overlay":true,"show":this.state.menu})} onClick={this.hideMenu}></div>
		    <div className={classNames({"lecture-card-menu":true,"show":this.state.menu})}>
		    	<ul className="options">
		    		<li>All Public</li>
		    		<li>All Private</li>
		    		<li>Delete</li>	    		
		    	</ul>
				<div className="lecture-card-menu-controls form-controls">
					<input className="form-control" ref="menu_title"/>
					<button onClick={this.saveMenu} className="btn btn-success">Save</button>
				</div>
			</div>
		</div>
	)	
}


renderSublecture() {
	let sublecture = this.props.sublecture
	if(!(sublecture instanceof Array))
		return;
	if(sublecture.length === 0)
		return;
	
	const lecture = sublecture[0]
	
	sublecture = sublecture.slice(1, sublecture.length)
	return (<LectureCard key={lecture.id} lecture={lecture} sublecture={sublecture} course={this.props.course} status={this.props.status} is_master={this.props.is_master} position={this.props.position} dispatch={this.props.dispatch} participants={this.props.participants}/>)
}


render() {
	const {status, lecture, course} = this.props;
    const {  id, title, lessons } = lecture;
    const courseId = course.id;

	const enabled = (status === "APPROVED" || status === "INSTRUCTOR") || lessons.filter(lesson=>(lesson.status === "public")).length !== 0
	
	const draggable =  (this.props.status === "INSTRUCTOR") ? "true" : "false"
    return (
      <div className={classNames({
	     "lecture-card":true,
	     "placeholder":this.state.drag,
	     "lecture-card-disabled": !enabled
      })}  ref="card" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable={draggable} data-position={this.props.position}>
      
	       <div className="lecture-card-content" ref="content">
		   		{this.renderMenu()}
	        	<h2 title="실전 프로젝트" dir="auto" className="lecture-card-title">{title}</h2>
	        	<ul className="lesson-cards">
	        		{lessons.map(lesson => (<LessonCard key={lesson.id} lesson={lesson} lecture={this.props.lecture} course={this.props.course} status={status} participants={this.props.participants}/>))}
	        	</ul>
	        	{this.renderEdit()}
        	</div>
        	<div className="lecture-card-sublecture" ref="sublecture" draggable="true" onDragOver={this.dragsubover}>
        		{this.renderSublecture()}
        		<div className="lecture-card-sublecture-add"></div>
        	</div>
        	<div className="lecture-card-lock glyphicon glyphicon-lock"></div>
      </div>
    )
  }
}
)