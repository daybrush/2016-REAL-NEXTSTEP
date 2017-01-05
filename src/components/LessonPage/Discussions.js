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
import loadPage from "../../class/Page"
class component extends Component {

state = {
	show: true,
	showReply: false,
	load_mark : false,
	nowDiscussion : -1
}
mde = "";
componentWillMount() {
	console.log("willmount");
	this.props.actions.fetchGetDiscussions({
		url: this.props.lesson._links.discussions.href,
		id: this.props.lessonId
	});

}
componentDidMount() {
	if(!this.mde)
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
	if(this.state.nowDiscussion !== -1)
		return this.submitDiscussionReply(e)
		
		
	const value = this.mde.value()
	const lessonId = this.props.lessonId
	this.props.actions.fetchAddDiscusssion({
		lessonId,
		lesson : this.props.lesson._links.self.href,
		comment: value
	}).catch(e => {
		alert("등록되지 않았습니다.")
	})
	
	
	this.mde.value("");
}
submitDiscussionReply = (e) => {
	const value = this.mde.value();
	const lessonId = this.props.lessonId
	this.props.actions.fetchAddDiscusssionReply({
		discussion : this.state.nowDiscussion._links.self.href,
		comment: value,
		id: this.state.nowDiscussion.id
	}).catch(e => {
		alert("등록되지 않았습니다.")
	})
	
	
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
	this.props.actions.fetchGetDiscussionReplies({
		discussionId: discussion.id,
		lessonId: this.props.state.lesson.id,
		url: discussion._links.replies.href
	});

}

renderDiscussions() {
	if(!this.props.state.lesson.discussions || !this.props.state.lesson.discussions._embedded) {
		return loadPage("loading")
	}
	
	
	const discussions = this.props.state.lesson.discussions._embedded.discussions


	if(!this.state.load_mark)
		return(<div className="discussions"></div>)
		
		
	return (
	<div className="discussions">
		<ul>
			{ discussions.map((discussion,i) => (
    			<Discussion discussion={discussion} nowDiscussion={this.state.nowDiscussion.id} key={i} onClick={this.showReplyTab} contents={this.props.contents} />
			))}
			
		</ul>
	</div>
	)
}
renderReply() {
	if(!this.state.showReply || this.state.nowDiscussion === -1)
		return ""
	
	const replies = this.state.nowDiscussion && this.state.nowDiscussion.replies || []
	if(replies.length === 0)
		return (<div>No Replies</div>)
	return (<ul>
		{replies.map((discussion,i) => (
			<DiscussionReply discussion={discussion} key={i}/>
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
		            	<div className="discussion-form-btns">
	                   <button type="button" className="btn btn-info discussion-submit" onClick={this.submitDiscussion}> POST </button>
	                   </div>
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
