import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import DragDrop from "../../class/dragdrop"
import LoginSession from "../../class/LoginSession"
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
	componentWillMount() {
		//console.log(LoginSession.info)
	}
	renderBadges(badges) {
		const _badges = []
		if("discussions" in badges)
			_badges.push((<div key="discussions" className="session-card-badge badge-discussions"><i className="glyphicon glyphicon-comment"></i><span>{badges.discussions}</span></div>))

		
		
		return _badges;
	}
	render() {
	    const {  lecture, session, course, status} = this.props;
	    
	    const sessionStatus = session.status || "private"
	    const userStatus = course.userStatus || ""
	    const badges = session.badges || {}
	    
	
		const enabled = sessionStatus === "public" || sessionStatus === "private" && status === "APPROVED"
		
	    return (
		    <li onClick={this.go}>
		    	<div className="session-card-title"><a href={"/session/"+session.id}>{session.title}</a></div>
		    	<div className="session-card-badges">
		    		{this.renderBadges(badges)}
		    	</div>
		    	<div className={classNames({"session-card-lock":true, "session-card-disabled":!enabled})}>잠금</div>
		    </li>
		)
	}
}
)