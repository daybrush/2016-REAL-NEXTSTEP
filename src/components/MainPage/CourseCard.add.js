import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import validate from "../../class/Validation"
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
add = (e) => {
	const {actions, course, professor} = this.props;
	
	let name = this.inputName.value, startDate = this.datepicker1.value, endDate = this.datepicker2.value
	
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
	
	startDate += "T00:00:00.000Z";
	endDate += "T23:59:59.000Z";
	
	
	actions.fetchAddCourse({
		name,
		description: "",
		startDate,
		endDate
	}).then(function(value) {
		//actions.load({type:"add", target:"course", value:{name:value.name, id:3}});
		console.log(value)
	}).then(e => {
		alert("생성했습니다.")
	}).catch(e => {
		console.log("ERR", e);
		alert("생성하지 못했습니다.");
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
        <h4 className="modal-title" id="exampleModalLabel">Create Course</h4>
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
				    <textarea className="form-control" id="form-description"></textarea>
			    </div>
			</div>				
			<div className="course-add-group">
				<label className="control-label  col-sm-3 col-xxs-12" for="form-image">Image :</label>
				<div className="text-name col-sm-9 col-xxs-12 ">
				    <input type="file" id="form-image"/>
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


  render() {

    
    return (
      <li className="course-card-add">
			<a onClick={this.editMode} href="#">강의개설</a>
			
			{this.renderDialog()}
      </li>
    )
  }
}

const mapStateToProps = state => {
	return {state: state.MyCourses}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
