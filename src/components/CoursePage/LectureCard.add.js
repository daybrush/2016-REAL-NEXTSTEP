import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'



export default class AddCourseCard extends Component {
state = {
	edit : false
}

editMode = () => {
	this.setState({edit:true});	
}
closeEdit = () => {
	this.setState({edit:false});	
}

addCourse = () => {
	console.log(this);
	const title = this.refs.title.value;
	this.props.actions.fetchAddLecture(this.props.course.id);
	//NEXTActions
}
renderEdit() {
	return (
		<div className="lecture-add-controls"  style={{display:(this.state.edit?"block":"none")}}>
			<div className="form-controls">
				<input type="text" ref="title" className="form-control" placeholder="Add a list..."/>
				<button onClick={this.addCourse} className="btn btn-success">Add</button>
				<button onClick={this.closeEdit} className="btn btn-default btn-close">X</button>
			</div>
		</div>
	
	)
}
  render() {


    return (
      <div className="lecture-card">
      	<div className={classNames({"lecture-card-content add-lecture-card-content" : true,"mod-edit": this.state.edit})}>
      		<span className="add-placeholder" onClick={this.editMode}  style={{display:(this.state.edit?"none":"block")}}>Add a Lecture...</span>
        	{this.renderEdit()}
        </div>
        	
      </div>
    )
  }
}
