import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './css/Info.css'
class component extends Component {
close = () => {
	this.props.CoursePage.setState({show_info:false});
}
modalClose = (e) => {
 	if(e.target !== this.refs.modal)
 		return
 		
 	this.close()
}
render() {
	const CoursePage = this.props.CoursePage;
	const session = CoursePage.getSession();
	return (
	<div className="course-info-modal modal fade in" role="dialog"  ref="modal" onClick={this.modalClose}>
	<div className="course-info-dialog modal-dialog modal-lg" role="document">
		<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}><span aria-hidden="true" onClick={this.close}>&times;</span></button>
				<h4 className="modal-title" id="exampleModalLabel">{session.name}</h4>
			</div>
			<div className="modal-body"> <h4>Text in a modal</h4> <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p> <h4>Popover in a modal</h4> <p>This <a href="#" className="btn btn-default popover-test" role="button" title="" data-content="And here's some amazing content. It's very engaging. right?" data-original-title="A Title">button</a> should trigger a popover on click.</p> <h4>Tooltips in a modal</h4> <p><a href="#" className="tooltip-test" title="" data-original-title="Tooltip">This link</a> and <a href="#" className="tooltip-test" title="" data-original-title="Tooltip">that link</a> should have tooltips on hover.</p> <hr/> <h4>Overflowing text to show scroll behavior</h4> <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p> <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p> <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p> <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p> <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p> <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p> </div>
		</div>
	</div>
	</div>
	)
}

}

export default  component;