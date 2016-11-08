import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions'



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
	NEXTActions.fetchAbout(this.props.actions, {type:"add", target:"lecture", id:this.props.course.id});
	this.setState({edit:false});
	//NEXTActions
}
renderEdit() {
	return (
		<div className="lecture-add-controls"  style={{display:(this.state.edit?"block":"none")}}>
		<div><input type="text" ref="title" className="form-control" placeholder="Add a list..."/></div>
		<button onClick={this.addCourse} className="btn btn-success">Save</button>
		<button onClick={this.closeEdit} className="btn btn-default">Cancel</button>		
		</div>
	
	)
}
  render() {


    return (
      <div className="lecture-card">
      	<div className={classNames({"lecture-card-content add-lecture-card-content" : true,"mod-edit": this.state.edit})}>
      		<span className="add-placeholder" onClick={this.editMode}  style={{display:(this.state.edit?"none":"block")}}>Add a list...</span>
        	{this.renderEdit()}
        </div>
        	
      </div>
    )
  }
}
