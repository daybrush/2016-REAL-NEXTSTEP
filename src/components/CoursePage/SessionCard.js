import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import DragDrop from "../../class/dragdrop"

export default connect(
	state => ({state: state.CoursePage}),
	dispatch => ({ actions: bindActionCreators(NEXTActions, dispatch), dispatch})
)
(class LectureCard extends Component {

	state = {
		drag : false
	}
	dragndrop = new DragDrop();
  
	dragover = (e) => {
		const {card, content} = this.refs;
		
		this.dragndrop.dragover(e, card, content);
	
		if(!this.state.drag)
			return;
	
	}
	dragstart= (e) => {
		console.log("dragstart");
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
	
	
	
		const lectures = this.props.state.course.lectures;	
		const myPosition = this.props.position, targetPosition = this.getNodeIndex(card);
		if(myPosition === targetPosition)
			return;
			
		const myCourse = lectures[myPosition], targetCourse = lectures[targetPosition];
		const myId = myCourse.id, targetId = targetCourse.id;
		
		
		//this.props.actions.swap("lecture", myPosition, targetPosition);
		//NEXTActions.fetchSwap("", "lecture", myId, targetId);
		
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
	
  render() {
    const {  lecture, session, course } = this.props;
    
    const status = session.status || "private"
    const userStatus = course.userStatus || ""


    return (
	    <li onClick={this.go}>
	    	<div className="session-card-title">{session.title}</div>
	    	<div className="badges"></div>
	    </li>
	)
  }
}
)