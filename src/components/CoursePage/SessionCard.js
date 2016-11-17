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
	
	
	

		const myPosition = this.props.position, targetPosition = this.getNodeIndex(card);
		if(myPosition === targetPosition)
			return;
		
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
	    const badges = session.badges || {}
	    const progress = badges.completed || "0";
	
		const enabled = sessionStatus === "public" || sessionStatus === "private" && (status === "APPROVED" || status === "INSTRUCTOR")
		
		const draggable = 	(status === "INSTRUCTOR") ? "true" : "false"
		
	    return (
		    <li onClick={this.go} className={classNames({"session-card":true, "session-card-disabled":!enabled, "placeholder":this.state.drag})} onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable={draggable} ref="card">
		    	<div className="session-card-content" ref="content">
			    	<div className="session-card-title"><Link to={"/session/"+session.id}>{session.title}</Link></div>
			    	<div className="session-card-badges">
			    		{this.renderBadges(badges)}
			    	</div>
			    	<div className="session-card-progress">
			    		<div className="session-card-progress-ball" style={{left:progress+"%"}}></div>
			    	</div>
		    	</div>
        	<div className="session-card-lock glyphicon glyphicon-lock"></div>
		    </li>
		)
	}
}
)