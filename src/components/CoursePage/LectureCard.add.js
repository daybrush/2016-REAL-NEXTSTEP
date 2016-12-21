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
	this.refs.name.value = "";
	this.setState({edit:false});	
}

addCourse = () => {
	console.log(this);
	const name = this.refs.name.value;
	this.props.actions.fetchAddLecture(name, this.props.is_master, this.props.session._links.self.href);
	this.closeEdit();
}
renderEdit() {
	return (
		<div className="lecture-add-controls"  style={{display:(this.state.edit?"block":"none")}}>
			<div className="form-controls">
				<input type="text" ref="name" className="form-control" placeholder="Add a list..."/>
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
