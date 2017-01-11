import React, { Component } from 'react'
import classNames from 'classnames'
import * as NEXTActions from '../../actions/Course'
import validate from "../../class/Validation"


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
	
	if(!validate(name, ["IS_EMPTY"]))
		return
		
		
	this.props.actions.fetchAddLecture({
		name,
		is_master:this.props.is_master,
		session:this.props.session._links.self.href
	});
	this.closeEdit();
}
handleKey = (e) => {
	if(e.keyCode !== 13)
		return false;
		
	this.addCourse();
}

renderEdit() {
	return (
		<div className="lecture-add-controls"  style={{display:(this.state.edit?"block":"none")}}>
			<div className="form-controls">
				<input type="text" ref="name" className="form-control" placeholder="Add a list..." onKeyUp={this.handleKey}/>
				<button onClick={this.addCourse} className="btn btn-success">Add</button>
				<button onClick={this.closeEdit} className="btn btn-default btn-close">X</button>
			</div>
		</div>
	
	)
}
handleKey = (e) => {
	if(e.keyCode !== 13)
		return false;
		
	this.addCourse();
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
