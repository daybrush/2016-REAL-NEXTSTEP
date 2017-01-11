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
		drag : false,
		parent: "",
	}
	selector = ".lesson-card"
	dragndrop = new DragDrop(".lesson-card")

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

		this.state.parent = card.parentNode

	}
	dragend = (e) => {
		if(!this.state.drag)
			return;

		this.setState({drag:false});

		const {card, content} = this.refs;
		const {is_master, lecture, lesson} = this.props;

		const target = document.querySelector(this.selector + "[isdrag='1']")
		this.dragndrop.dragend(e, card, content);
		const elCards = this.props.lectureCard.refs.card.querySelectorAll(this.selector), length = elCards.length
		let elCard

		const lecturePosition = this.props.position
		let cardPosition = -1;

		let pos = lecture.pos
		for(let i = 0; i < length; ++i) {
			elCard = elCards[i]
			if(elCard === card) {
				cardPosition = i
				break
			}
		}


		let targetId = pos[lecturePosition];

		console.log(pos, cardPosition, targetId)
		if(cardPosition > -1) {

			pos = pos.filter((id, i) => (id !== lesson.id))

			pos.splice(cardPosition, 0, targetId)



			console.log("POS", pos)

			this.state.parent.insertAdjacentElement("beforeend", target)
			this.state.parent = ""



			const id = lecture.id
			this.props.actions.saveLessonPosition(is_master, pos)
			this.props.actions.fetchSwapLesson({
				id,
				pos,
				is_master
			})

		}

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
	toggleLockLesson = (e) => {
		const access = this.props.lesson.access = this.props.lesson.access === "PUBLIC" ? "PRIVATE" : "PUBLIC"
		e.preventDefault();
		this.props.actions.fetchChangeLesson({
			lessonId: this.props.lesson.id,
			lectureId: this.props.lecture.id,
			is_master: this.props.is_master,
			url: this.props.lesson._links.self.href,
			access
		}).catch(e=> {
			console.error(e)
			alert("실패하였습니다.")
		})
	}
	deleteLesson = (e) => {
		e.preventDefault();
		const a = confirm("삭제하시겠습니까?")

		if(!a)
			return;

		this.props.actions.deleteLesson({
			id: this.props.lesson.id,
			lectureId: this.props.lecture.id,
			is_master: this.props.is_master
		}).catch(e=> {
			console.error(e)
			alert("실패하였습니다.")
		})
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
	    console.log(lesson);
	    const isAccess = lesson.access === "PUBLIC"
	    const badges = lesson.badges || {}

		const participants = this.props.participants, participantsLength = participants.length;
	    let progress = participantsLength === 0 ? 0 : (badges.completed || 0) / participantsLength * 100;
	    if(progress >= 100)
	    	progress = 100;
		const enabled = isAccess ||  (status === "APPROVED" || status === "INSTRUCTOR")

		const draggable = (status === "INSTRUCTOR") ? "true" : "false"

	    return (
		    <li onClick={this.go} className={classNames({"lesson-card":true, "lesson-card-disabled":!enabled, 
			     "lesson-card-edit-show":(status === "INSTRUCTOR"),
			     "placeholder":this.state.drag})} onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable={draggable} ref="card">
		    	<div className="lesson-card-content" ref="content">
			    	<div className="lesson-card-name"><Link to={"/" +course.id +"/lesson/"+lesson.id}>{lesson.name}</Link></div>
			    	<Link className="lesson-card-edit glyphicon glyphicon-pencil" to={"/" +course.id+"/lesson/"+lesson.id+"/edit"}></Link>
					<a className="lesson-card-edit glyphicon glyphicon-remove" href="#" onClick={this.deleteLesson}></a>
			    	<a className={classNames({
				    	"lesson-card-edit lesson-card-access-icon": true,
				    	"lesson-card-access": isAccess
				    	})} href="#" onClick={this.toggleLockLesson}></a>
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
