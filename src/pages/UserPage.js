import React, { Component } from 'react'
import * as NEXTActions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LectureCard from '../components/LectureCard'
import LectureCardAdd from '../components/LectureCard.add'
import './css/UserPage.css'


class Page extends Component {
	
	componentWillMount() {
		document.body.className = "";
		const {actions, params} = this.props;
		const {userId} = params;
	
			
	}
	renderHeader() {
		const {name, lectures} = this.props.state.user;

			

		return (
			<div className="user-header">
				<div className="user-header-content">
					<span className="profile-image glyphicon glyphicon-user"></span>
					<span className="profile-user-name">{name}</span>
				</div>
				<div class="user-header-tab">
					<ul>
						<li>수강중</li>
						<li>수강완료</li>
						<li>나의이력</li>
					</ul>
				</div>
			</div>
			
		)
	}
	render() {
		const {user, actions} = this.props.state;
		const lectures = user.lectures
		
		
  		return (
  		<div>
	  		{this.renderHeader()}
		  		<div className="user-content">
		    	<ul className="lecture-list row">
		          {lectures.map(lecture =>
		            <LectureCard isLink="true" lecture={lecture} key={lecture.id} actions={actions} />
		          )}
		            <LectureCardAdd actions={actions} user={user} />
		    	</ul>
	   		</div>
   		</div>
  		)
  	}
}


const mapStateToProps = state => {
	return {state: state.userPage}
}

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
