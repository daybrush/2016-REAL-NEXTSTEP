import * as Actions from '../constants/ActionTypes'

const initialState = {
	"issue" :{
	  "id": -1,
	  "course": {
	    "id": 0,
	    "title": ""
	  },
	  "comments": [
	  ],
	  "discussion": [
	  ],
	  "attachments": [
	  ],
	  "content" : ""
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case "GET_COMMENTS":
			state.issue.comments = action.comments;
			return Object.assign({}, state);
		case "ADD_COMMENT":
			state.issue.comments.push(action.comment);
			return Object.assign({}, state);
		case Actions.GET_ISSUE:
			state.issue = action.issue;
			return Object.assign({}, state);
	}
	return state;
}
