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

	 this.orderLessons()
 }
 componentWillUpdate() {
	 this.orderLessons()	 
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
	const session = this.props.session
	const is_master = this.props.is_master	
	const target = document.querySelector(this.selector + "[isdrag='1']")
	this.dragndrop.dragend(e, card, content);
	


	const lecture = this.props.lecture
	const elCards = document.querySelectorAll((this.props.is_master ? ".course-master-lectures" : ".course-session-lectures" ) + " .lecture-cards>.lecture-card"), length = elCards.length
	
	let elCard, position, is_sublecture = false
	
	const lecturePosition = this.props.position
	let cardPosition = -1;
	
	let pos = session.pos
	
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

	
	let targetId = pos[lecturePosition], sublecturePosition;
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
		
		
		console.log("POS", pos)
	
		this.state.parent.insertAdjacentElement("beforeend", target)
		this.state.parent = ""
		
		

		const id = this.props.session.id
		
		this.props.actions.saveLecturePosition(is_master, pos)
		this.props.actions.fetchSwapLecture({
			id,
			pos, 
			is_master,
			url: this.props.session._links.self.href
		})
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
        if (node.nodeType !== 3 || !/^\s*$/.test(node.data)) {
            index++;
        }
    }
    return index;
}

showMenu = () => {
	this.setState({menu:true, edit: false});
	this.refs.menu_title.value = this.props.lecture.name
}
hideMenu = () => {
	this.setState({menu:false});
}
saveMenu = () => {
	const {lecture, is_master} = this.props, name = this.refs.menu_title.value
	this.props.actions.fetchChangeLecture({
		id: lecture.id,
		is_master,
	}, {
		name
	})
	
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
	const name = this.refs.name.value;
	const id = this.props.lecture.id
	this.props.actions.fetchAddLesson({
		name,
		is_master: this.props.is_master,
		lecture: this.props.lecture._links.self.href,
		id
	}).catch(e => {
		console.error(e);
		alert("생성하지 못했습니다.");
	})
	
	this.refs.name.value = "";
	this.setState({edit:false});
	//NEXTActions
}
deleteLecture = (e) => {
	e.preventDefault();
	const a = confirm("삭제하시겠습니까?")
	
	if(!a)
		return;
		
	this.props.actions.deleteLecture({
		id: this.props.lecture.id
	}).catch(e=> {
		console.error(e)
		alert("실패하였습니다.")
	})
}

orderLessons = () => {
	const objLectures = {};
	const lecture = this.props.lecture, lectureId = lecture.id
	const lessons = lecture.lessons	|| []
	let pos = lecture.pos
	try {
  		if(typeof pos === "string")
  			pos = JSON.parse(pos)
  	} catch(e) {
	  	pos = []
  	}
  	lecture.pos = pos || []
  	
	let addPos = lessons.filter(lesson => {
		objLectures[lesson.id] = lesson;
		
		return pos.every((id, index) => {
			
			//lecture가 pos Array에  하나라도 없을 때 true를 return한다.
			
		if(id instanceof Array)
			return id.indexOf(lesson.id) === -1
		
		return id !== lesson.id
		})
	}).map(lesson=>(lesson.id))
	
	
	
	let is_update = false;
	
	
	if(addPos.length > 0) {
		pos = pos.concat(addPos);
		is_update = true;
	
	}
	
	addPos = pos;
	pos = pos.filter((id, i) => {	
		return id in objLectures
	})
	
	if(pos.length !== addPos.length) {
		is_update = true;
	}
	
	if(is_update) {
		console.log(lectureId, pos);
		const is_master = this.props.is_master

		this.props.actions.saveLessonPosition({
			is_master, pos, lectureId
		})
		this.props.actions.fetchSwapLesson({
			id:lecture.id,
			pos,
			is_master
		})
	}

	
	return pos;
}





renderEdit() {
	if(this.props.status !== "INSTRUCTOR")
		return;
		
	return (
	    <div className={classNames({"lesson-card-add":true,"lesson-card-add-show":this.state.edit})}>
			<span className="lesson-card-add-placeholder" onClick={this.showEdit}>Add a Lesson...</span>
			<div className="lesson-card-add-controls form-controls">
				<input type="text" ref="name" className="form-control" placeholder="Add a Lesson..."/>
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
		    		<li onClick={this.deleteLecture}>Delete</li>	    		
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
	const {course, status, session, position, participants, is_master, actions, state, dispatch}  = this.props
	const props = {
		key: lecture.id,
		position,
		lecture,
		sublecture,
		course,
		session,
		status,
		is_master,
		participants,
		actions,
		state,
		dispatch
	}
	
	return (<LectureCard {...props}/>)
	
}


renderLessons() {
	const objLectures = {};
	const lecture = this.props.lecture, lessons = lecture.lessons || []
	lessons.filter(lecture => {
  		objLectures[lecture.id] = lecture;
	});	
	const pos = lecture.pos || []
	const _pos = pos.map((id, i)=> {
		if(typeof id === "object")
			return id.map(id => {
				return objLectures[id]
			})
		
		
		return objLectures[id]
	})
	return (<ul className="lesson-cards">
        		{lessons.map((lesson,i) => (<LessonCard key={lesson.id} position={i} lesson={lesson} lecture={this.props.lecture} lectureCard={this} course={this.props.course} status={this.props.status} participants={this.props.participants} is_master={this.props.is_master}/>))}
        	</ul>)
}


render() {
	const {status, lecture, course} = this.props;
    const {  id, name, lessons } = lecture;
    const courseId = course.id;

	const enabled = (status === "APPROVED" || status === "INSTRUCTOR") || lessons.filter(lesson=>(lesson.access === "PUBLIC")).length !== 0
	
	const draggable =  (this.props.status === "INSTRUCTOR") ? "true" : "false"
    return (
      <div className={classNames({
	     "lecture-card":true,
	     "placeholder":this.state.drag,
	     "lecture-card-disabled": !enabled
      })}  ref="card" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable={draggable} data-position={this.props.position}>
      
	       <div className="lecture-card-content" ref="content">
		   		{this.renderMenu()}
	        	<h2 title="실전 프로젝트" dir="auto" className="lecture-card-title">{name}</h2>
	        	{this.renderLessons()}
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