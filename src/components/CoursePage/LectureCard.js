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
	}
	dragndrop = new DragDrop(".course-session-lectures .lecture-card");
  
dragover = (e) => {
	if(!this.props.draggable || (this.props.status !== "INSTRUCTOR"))
		return;
		
	const {card, content} = this.refs;
	
	this.dragndrop.dragover(e, card, content);

	if(!this.state.drag)
		return;

}
dragstart= (e) => {
	if(!this.props.draggable || (this.props.status !== "INSTRUCTOR"))
		return;
		
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

showMenu = () => {
	this.setState({menu:true, edit: false});
	document.querySelector(".lecture-overlay").style.display = "block";
	this.refs.menu_title.value = this.props.lecture.title
}
hideMenu = () => {
	this.setState({menu:false});
	document.querySelector(".lecture-overlay").style.display = "none";
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
		    <div className={classNames({"lecture-card-menu":true,"lecture-card-menu-show":this.state.menu})}>
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
render() {
	const {status, lecture, course} = this.props;
    const {  id, title, lessons } = lecture;
    const courseId = course.id;

	const enabled = (status === "APPROVED" || status === "INSTRUCTOR") || lessons.filter(lesson=>(lesson.status === "public")).length !== 0
	
	const draggable = 	this.props.draggable && (this.props.status === "INSTRUCTOR") ? "true" : "false"
    return (
      <div className={classNames({
	     "lecture-card":true,
	     "placeholder":this.state.drag,
	     "lecture-card-disabled": !enabled
      })}  ref="card" onDragStart={this.dragstart} onDragOver={this.dragover} onDragEnd={this.dragend}  draggable={draggable} data-position={this.props.position}>
      
	       <div className="lecture-card-content" ref="content">
		   		{this.renderMenu()}
	        	<h2 title="실전 프로젝트" dir="auto" className="lecture-title-name">{title}</h2>
	        	<ul className="lesson-cards">
	        		{lessons.map(lesson => (<LessonCard key={lesson.id} lesson={lesson} lecture={this.props.lecture} course={this.props.course} status={status}/>))}
	        	</ul>
	        	{this.renderEdit()}
        	</div>
        	<div className="lecture-card-lock glyphicon glyphicon-lock"></div>
      </div>
    )
  }
}
)