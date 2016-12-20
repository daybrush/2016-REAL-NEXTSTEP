import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import DragDrop from "../../class/dragdrop"
import LoginSession from "../../class/LoginSession"

import StoreSession from "../../class/StoreSession"


import "./css/LessonCard.css"

export default connect(
	state => ({state: state.CoursePage}),
	dispatch => ({ actions: bindActionCreators(NEXTActions, dispatch), dispatch})
)
(class component extends Component {

	state = {
		drag : false
	}
	dragndrop = new DragDrop(".lesson-card");
  
	dragover = (e) => {
		if(this.props.status !== "INSTRUCTOR")
			return;
			
			

		const {card, content} = this.refs;
		console.log("DRAGOVER");
		this.dragndrop.dragover(e, card, content);
	
		if(!this.state.drag)
			return;
	
	}
	dragstart= (e) => {
		if(this.props.status !== "INSTRUCTOR")
			return;
			
		this.setState({drag:true});
		
		const {card, content} = this.refs;
		this.dragndrop.dragstart(e,card,content);
		

	
	}
	dragend = (e) => {
		if(!this.state.drag)
			return;
			
		this.setState({drag:false});
		
		const {card, content} = this.refs;
		this.dragndrop.dragend(e, card, content);
	
/*
		const target = document.querySelector(this.selector + "[isdrag='1']")
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
			
			
			const course = this.props.course, courseId = this.props.params.course, sessionId = this.props.is_master? course.masterSession.id : course.defaultSession.id
			
			this.props.actions.fetchSwapLecture({
				courseId, sessionId, pos,
		  		is_master : this.props.is_master
	  		})
	
		}
*/
		
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
	componentWillMount() {
		//console.log(Loginlesson.info)
	}
	renderBadges(badges) {
		const _badges = []
		if("discussions" in badges)
			_badges.push((<div key="discussions" className="lesson-card-badge badge-discussions"><i className="glyphicon glyphicon-comment"></i><span>{badges.discussions}</span></div>))

		
		
		return _badges;
	}

	render() {
	    const {  lecture, lesson, course, status} = this.props;
	    
	    const isAccess = lesson.access === "PUBLIC"
	    const badges = lesson.badges || {}

		const participants = this.props.participants, participantsLength = participants.length;
	    let progress = participantsLength === 0 ? 0 : (badges.completed || 0) / participantsLength * 100;
	    if(progress >= 100)
	    	progress = 100;
		const enabled = isAccess ||  (status === "APPROVED" || status === "INSTRUCTOR")
		
		const draggable = (status === "INSTRUCTOR") ? "true" : "false"
		
	    return (
		    <li onClick={this.go} className={classNames({"lesson-card":true, "lesson-card-disabled":!enabled, "placeholder":this.state.drag})} onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable={draggable} ref="card">
		    	<div className="lesson-card-content" ref="content">
			    	<div className="lesson-card-title"><Link to={"/" +course.id +"/lesson/"+lesson.id}>{lesson.title}</Link></div>
			    	<Link className="lesson-card-edit glyphicon glyphicon-pencil" to={"/" +course.id+"/lesson/"+lesson.id+"/edit"}></Link>
			    	<div className="lesson-card-badges">
			    		{this.renderBadges(badges)}
			    	</div>
			    	<div className="lesson-card-progress">
			    		<div className="lesson-card-progress-ball" style={{left:progress +"%"}}></div>
			    	</div>
		    	</div>
        	<div className="lesson-card-lock glyphicon glyphicon-lock"></div>
		    </li>
		)
	}
}
)