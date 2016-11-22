//import * as Actions from '../constants/ActionTypes'

const initialState = {
	"lesson" :{
	  "id": -1,
	  "course": {
	    "id": 0,
	    "title": ""
	  },
	  "comments": [
	  ],
	  "discussions": [
	  ],
	  "attachments": [
	  ],
	  "content" : ""
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "ADD_DISCUSSION":
			state.lesson.discussions.push(action.discussion);
			return Object.assign({}, state);
		case "GET_DISCUSSIONS":
			state.lesson.discussions = action.discussions
			return Object.assign({}, state);
		case "GET_DISCUSSION" :
			const _discussion = action.discussion
			state.lesson.discussions.filter(discussion => {
				return discussion.id === _discussion.id
			}).map(discussion => {
				discussion.replies = _discussion.replies
			})
			return Object.assign({}, state);								
		case "GET_LESSON":
			state.lesson = action.lesson;
			return Object.assign({}, state);

		default:
			return state;
	}
	//return state;
}
