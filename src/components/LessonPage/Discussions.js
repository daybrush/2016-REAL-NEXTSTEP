import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import * as NEXTActions from '../../actions/Lesson'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'


import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';


import Discussion from './Discussion'
import DiscussionReply from './DiscussionReply'

class component extends Component {

state = {
	show: true,
	showReply: false,
	load_mark : false,
	nowDiscussion : -1
}
mde = "";
componentWillMount() {
	this.props.actions.fetchGetDiscusssions(this.props.lessonId);

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

	this.props.actions.fetchAddDiscusssion(this.props.lessonId, value);
	
	
	this.mde.value("");
}
closeReplyTab = (e) => {
	e.preventDefault();	
	this.setState({showReply:false, nowDiscussion :-1})
	
	this.props.resizeView(this.props.option.tab_width / 2);
	
}
showReplyTab = (discussion) => {
	if(this.props.option.tab_width < 600)
		this.props.resizeView(600);
	
		
	this.setState({showReply:true, nowDiscussion:discussion})
	this.props.actions.fetchGetDiscusssion(discussion.id);

}

renderDiscussions() {
	const {discussions} = this.props.state.lesson;
	if(!this.state.load_mark)
		return(<div className="discussions"></div>)
	return(<div className="discussions">
    		<ul>
    			{ discussions.map((discussion,i) => (
	    			<Discussion discussion={discussion} nowDiscussion={this.state.nowDiscussion.id} key={i} onClick={this.showReplyTab} contents={this.props.contents} />
    			))}
    			
    		</ul>
    	</div>)
}
renderReply() {
	if(!this.state.showReply || this.state.nowDiscussion === -1)
		return ""
	
	const replies = this.state.nowDiscussion && this.state.nowDiscussion.replies || []
	if(replies.length === 0)
		return (<div>No Replies</div>)
	return (<ul>
		{replies.map((reply,i) => (
			<DiscussionReply reply={reply} key={i}/>
		))}
	</ul>)
	
}
render() {


    return (
    	<div className={classNames({
    		"discussions-tab":true,
    		"show":this.state.show,
	    	"discussion-reply-tab-open" : this.state.showReply
    	})}>
    		<div className={classNames({
	    			"discussions-wrapper": true
	    		})}>
		    	{this.renderDiscussions()}
		    	<div className="discussion-form form-group">
		            	<textarea className="form-control discussion-input" ref="name"></textarea>
	                   <button type="button" className="btn btn-info discussion-submit" onClick={this.submitDiscussion}> POST </button>
	          </div>
	        </div>
	        <div className="discussion-reply-tab">
	        	<div className="discussion-reply-tab-close">
	        		<a className="glyphicon glyphicon-menu-right" href="#" onClick={this.closeReplyTab}></a>
	        	</div>
		    	{this.renderReply()}	        	
	        </div>
	        
      </div>
    )
    
}

componentDidUpdate() {
	//..if(this.state.is	
}
}

const mapStateToProps = state => {
	return {state: state.Lesson}
}

const mapDispatchToProps = dispatch => {
  return{actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
