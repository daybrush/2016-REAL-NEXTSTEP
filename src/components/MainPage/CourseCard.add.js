import React, { Component } from 'react'
//import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Course'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class component extends Component {

state = {
	edit : false
}
//\f007
editMode = () => {
	this.setState({edit:true});
}
add = (e) => {
	const {actions, course, professor} = this.props;
	
	
	//name, description
	
	
	actions.fetchAddCourse(this.inputName.value, "").then(function(value) {
		//actions.load({type:"add", target:"course", value:{name:value.name, id:3}});
		console.log(value)
	}).catch(e => {
		console.log("ERR", e)
		if(e.status === 403)
			alert("권한이 없습니다.")
	})
	
	this.inputName.value = "";
	
	this.close();
}

close = (e) => {
	this.setState({edit:false})
}

  render() {
  	const {isLink} = this.props;
  	const is_edit = this.state.edit;
    
    return (
      <li className="course-card-add course-card col-xxs-12 col-xs-6 col-sm-4 col-md-3">
			<a onClick={this.editMode}>Create New Course...    </a>
			

  <div className="course-card-add-dialog modal-dialog modal-sm" role="document" style={{display:(is_edit?"block":"none")}}>
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="exampleModalLabel">Create Course</h4>
      </div>
      <div className="modal-body">
          <div className="form-group">
            <label className="control-label">Name:</label>
            <input type="text" className="form-control" id="recipient-name" ref={(input) => { this.inputName = input; }}/>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" onClick={this.add}> Create </button>
      </div>
    </div>
  </div>

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
