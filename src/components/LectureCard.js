import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import DragDrop from "../class/dragdrop"

export default connect(
	state => ({state: state.LectureListPage}),
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
	
	
	this.props.actions.swap("lecture", myPosition, targetPosition);
	NEXTActions.fetchSwap("", "lecture", myId, targetId);
	
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
    const {  id, title, sessions } = this.props.lecture;
    const courseId = this.props.course.id;


    return (
      <div className={classNames({
	     "lecture-card":true,
	     "placeholder":this.state.drag 
      })}  ref="card" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable="true" data-position={this.props.position}>
	       <div className="lecture-card-content" ref="content">

	        	<Link to={"/lecture/" + courseId}><h2 title="실전 프로젝트" dir="auto" className="lecture-title-name">{title}</h2></Link>
	       		
	        	<ul className="lecture-card-sessions">
	        		{sessions.map(session => (<li key={session.id}><Link to={"/session/" + session.id}>{session.title}</Link></li>))}
	        	</ul>
	        	
        	</div>
      </div>
    )
  }
}
)