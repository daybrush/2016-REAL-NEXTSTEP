//import * as Actions from '../constants/ActionTypes'

const initialState = {
	"lesson" : 0
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "ADD_DISCUSSION":
			action.value.createdBy = action.value._embedded.createdBy
			state.lesson.discussions._embedded.discussions.push(action.value);
			return Object.assign({}, state);
		case "GET_DISCUSSIONS":
			state.lesson.discussions = action.value
			return Object.assign({}, state);
		case "GET_DISCUSSION_REPLIES" :
			const id = action.params.discussionId
			state.lesson.discussions._embedded.discussions.filter(discussion => {
				return discussion.id === id
			}).map(discussion => {
				discussion.replies = action.value._embedded.discussionReplies
			})
			return Object.assign({}, state);						
		case "ADD_DISCUSSION_REPLY":
			const id2 = action.params.id
			
			action.value.createdBy = action.value._embedded.createdBy
			
			state.lesson.discussions._embedded.discussions.filter(discussion => {
				return discussion.id === id2
			}).map(discussion => {

				discussion.replies.push(action.value)
			})
			return Object.assign({}, state);								
		case "GET_LESSON":
			state.lesson = action.value;
			return Object.assign({}, state);

		default:
			return state;
	}
	//return state;
}
