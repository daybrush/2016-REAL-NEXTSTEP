import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Link } from 'react-router'

import * as JSLoader from '../js/Loader.js'
import PDFLoader from '../class/PDFLoader.js'

import Page from "../pdf/PDFPage"
import PDFComments from "../components/PDFComments"

import "./css/PDFViewer.css"

class Viewer extends Component {
	pdfjs = "";
	
	state = {
		pdf_load : false
	}
	componentWillMount() {
		const {actions, id} = this.props;
		document.body.className="pdf-open";
		
		NEXTActions.fetchAbout(actions, {type:"get", target:"attachment", body:"id=" + id});
		const self = this;
		
		JSLoader.load("/js/pdf.js").then((js) => {
			self.pdfjs = new PDFLoader("/lec02a.pdf");
			self.pdfjs.init().then(() => {
				self.setState({pdf_load:true});
			});
		});
            
	}
	componentWillUnmount() {
		document.body.className="";
	}
  render() {
  	if(!this.state.pdf_load)
  		return (<div></div>);
  		
    return (<div className="pdf-wrapper">
    	<div className="pdf-page-wrapper">
    	{[1,2].map(page => (
    		<Page pageNum={page} key={page} pdfjs={this.pdfjs}/>
    	))}
    	</div>
    	<PDFComments />
    </div>
     
    )
  }
  
  
}


const mapStateToProps = state => {
	return {state: state.Viewer}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)
