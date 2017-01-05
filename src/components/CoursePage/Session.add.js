import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import validate from "../../class/Validation"
import classNames from 'classnames'
//import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.js"
class component extends Component {

state = {
	edit : false
}




componentDidMount() {
	window.jQuery(this.datepicker1).datepicker({
		format: "yyyy-mm-dd",
	    autoclose: true,
	    toggleActive: true
	});
	window.jQuery(this.datepicker2).datepicker({
		format: "yyyy-mm-dd",
	    autoclose: true,
	    toggleActive: true
	});
}
//\f007
editMode = (e) => {
	this.setState({edit:true});
	this.inputName.focus();
	
	e.preventDefault();
}

loadSession = (id) => {
	this.props.actions.fetchGetSession({
		id
	}).catch(e => {
		
	})
	
}


add = (e) => {
	const {actions, state} = this.props;

	const name = this.inputName.value, startDate = this.datepicker1.value, endDate = this.datepicker2.value, description = this.description.value
	
	if(!validate(name, ["IS_EMPTY"])) {
		this.inputName.focus()
		return
	}

	if(!validate(startDate, ["IS_EMPTY", "IS_DATE"])) {
		this.datepicker1.focus()
		return
	}
		
	if(!validate(endDate, ["IS_EMPTY", "IS_DATE"])) {
		this.datepicker2.focus()
		return
	}
	
	
	actions.fetchAddSession({
		name,
		description,
		startDate,
		endDate,
		course: state.course._links.self.href
	}).then(function(value) {
		//actions.load({type:"add", target:"course", value:{name:value.name, id:3}});
		console.log(value)
	}).then(e => {
		alert("생성했습니다.")
	}).catch(e => {
		console.log("ERR", e)
		if(e.status === 403)
			alert("권한이 없습니다.")
		else
			alert("생성하지 못했습니다.")
	})
	
	this.inputName.value = "";
	
	this.close();
}
handleKey = (e) => {
	if(e.keyCode !== 13)
		return false;
	
	
	this.datepicker1.focus();	
	//this.add();
}
close = (e) => {
	this.setState({edit:false})
}

modalClose = (e) => {
 	if(e.target !== this.modal)
 		return
 		
 	this.close()
}

renderDialog() {

  	const is_edit = this.state.edit;
	return(<div className="nextstep-overlay" style={{display:(is_edit?"block":"none")}} onClick={this.modalClose} ref={e=>{this.modal = e}}>
  <div className="course-card-add-dialog modal-dialog modal-md" role="document" >
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="exampleModalLabel">Create Session</h4>
      </div>
      <div className="modal-body">
          <div className="form-group">
          
            <div className="course-add-group">
	            <label className="control-label  col-sm-3 col-xxs-12">Name :</label>
	            <div className="text-name col-sm-9 col-xxs-12">
		            <input type="text" className="form-control" id="recipient-name" ref={(input) => { this.inputName = input; }} onKeyUp={this.handleKey} 
		            required="true"/>
	            </div>
            </div>
            
            
            <div className="course-add-group">
	            <label className="control-label col-sm-3 col-xxs-12" for="form-duration">Duration :</label>

	            <div className="date-group input-group input col-sm-4 col-xxs-12">
				    <input type="text" className="form-control datepicker1" ref={(e)=>{this.datepicker1 = e}} id="form-duration"/>
				    <div className="input-group-addon">
				        <span className="glyphicon glyphicon-th"></span>
				    </div>
				</div>
				<div className="course-add-date-duration col-sm-1 col-xxs-12 "> ~ </div>
				
				<div className="date-group input-group input col-sm-4 col-xxs-12 ">
				    <input type="text" className="form-control datepicker2" ref={(e)=>{this.datepicker2 = e}}/>
				    <div className="input-group-addon">
				        <span className="glyphicon glyphicon-th"></span>
				    </div>
				</div>
			</div>
			<div className="course-add-group">
				<label className="control-label  col-sm-3 col-xxs-12" for="form-description">Description :</label>
				<div className="text-name col-sm-9 col-xxs-12 ">
				    <textarea className="form-control" id="form-description" ref={e=>{this.description=e}}></textarea>
			    </div>
			</div>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" onClick={this.add}> Create </button>
      </div>
    </div>
  </div>
</div>)

}

renderDropDown() {
	const session = this.props.state.course.defaultSession
	return(
		<div className="btn-group">
					{this.renderDialog()}
			<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span ref={e=>{this.menuToggleBtn = e}}>Session111111</span> <span className="caret"></span>
			</button>
			<ul className="dropdown-menu">
			{
				this.props.state.course.courseSessions.map((session2, i)=> {
					
					return(<li key={i} className={classNames({
						"active" : session.id === session2.id
					})}><a href="#" onClick={e=>{this.loadSession(session2.id); e.preventDefault();}}>{session2.name}</a></li>)
			})}
				<li role="separator" className="divider"></li>
				<li><a href="#" onClick={this.editMode}>Add Session.</a></li>
			</ul>
		</div>)
}

  render() {

    
    return this.renderDropDown()
  }
}

const mapStateToProps = state => {
	return {state: state.CoursePage}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
