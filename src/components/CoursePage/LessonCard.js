import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import DragDrop from "../../class/dragdrop"
import LoginSession from "../../class/LoginSession"


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
	
		const myPosition = this.props.position, targetPosition = this.getNodeIndex(card);

		
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
	    
	    const lessonStatus = lesson.status || "private"
	    const badges = lesson.badges || {}

		const participants = this.props.participants, participantsLength = participants.length;
	    let progress = participantsLength === 0 ? 0 : (badges.completed || 0) / participantsLength * 100;
	    if(progress >= 100)
	    	progress = 100;
		const enabled = lessonStatus === "public" || lessonStatus === "private" && (status === "APPROVED" || status === "INSTRUCTOR")
		
		const draggable = 	(status === "INSTRUCTOR") ? "true" : "false"
		
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