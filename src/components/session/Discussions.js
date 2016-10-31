import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Session'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'


import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';


import Discussion from './Discussion'

class component extends Component {

state = {
	show: true,
	load_mark : false
}
mde = "";
textarea  = (<textarea className="form-control discussion-input" ref="name"></textarea>)
componentWillMount() {
	this.props.actions.fetchGetDiscusssions(this.props.sessionId);

}
componentDidMount() {

		this.mde = new SimpleMDE({
				element: this.refs.name,
				status:false,
	    		showIcons: ["code"],
	    		placeholder: "Type here...",
	    		hideIcons: ["guide", "italic", "fullscreen", "side-by-side","ordered-list", "preview"],		
	    		toolbar: false
			});
		this.setState({load_mark:true});
}
submitDiscussion = (e) => {
	const value = this.mde.value();

	this.props.actions.fetchAddDiscusssion(this.props.sessionId, value);
	
	
	this.mde.value("");
}
renderDiscussions() {
	const {discussions} = this.props.state.session;
	if(!this.state.load_mark)
		return(<div className="discussions"></div>)
	return(<div className="discussions">
    		<ul>
    			{ discussions.map((discussion,i) => (
	    			<Discussion discussion={discussion} key={i} />
    			))}
    			
    		</ul>
    	</div>)
}
render() {


    return (
    	<div className={classNames({
    		"discussions-wrapper":true,
    		"show":this.state.show,
    	})}>
    		
	    	{this.renderDiscussions()}
	    	<div className="discussion-form form-group">
	            	{this.textarea}
                   <button type="button" className="btn btn-info discussion-submit" onClick={this.submitDiscussion}> POST </button>
          </div>
      </div>
    )
    
}

componentDidUpdate() {
	//..if(this.state.is	
}
}

const mapStateToProps = state => {
	return {state: state.Session}
}

const mapDispatchToProps = dispatch => {
  return{actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
