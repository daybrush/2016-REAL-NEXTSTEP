import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import DragDrop from "../../class/dragdrop"
import SessionCard from "./SessionCard"

export default connect(
	state => ({state: state.CoursePage}),
	dispatch => ({ actions: bindActionCreators(NEXTActions, dispatch), dispatch})
)
(class LectureCard extends Component {

	state = {
		drag : false,
		edit : false
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


editMode = () => {
	this.setState({edit:true});	
}
closeEdit = () => {
	this.setState({edit:false});	
}



addSession = () => {
	console.log(this);
	const title = this.refs.title.value;
		this.props.actions.fetchAddSession(this.props.course.id)
	this.setState({edit:false});
	//NEXTActions
}
renderEdit() {
	return (
		<div className="session-add-controls">
		<input type="text" ref="title" className="form-control" placeholder="Add a Session..."/>
		<button onClick={this.addSession} className="btn btn-success">Add</button>
		<button onClick={this.closeEdit} className="btn btn-default btn-close">X</button>		
		</div>
	
	)
}
  render() {
	 const {status, lecture, course} = this.props;
    const {  id, title, sessions } = lecture;
    const courseId = course.id;


    return (
      <div className={classNames({
	     "lecture-card":true,
	     "placeholder":this.state.drag 
      })}  ref="card" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable="true" data-position={this.props.position}>
      
	       <div className="lecture-card-content" ref="content">

	        	<h2 title="실전 프로젝트" dir="auto" className="lecture-title-name">{title}</h2>
	       		
	        	<ul className="lecture-card-sessions">
	        		{sessions.map(session => (<SessionCard key={session.id} session={session} lecture={this.props.lecture} course={this.props.course} status={status}/>))}
	        	</ul>
	        	<div className={classNames({"lecture-card-add-session":true,"lecture-card-add-session-show":this.state.edit})}>
					<span className="add-session-placeholder" onClick={this.editMode}>Add a Session...</span>
	        		{this.renderEdit()}
	        	</div>
        	</div>
      </div>
    )
  }
}
)