import * as Actions from '../constants/ActionTypes'

const initialState = {
	"session" :{
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
			state.session.discussions.push(action.discussion);
			return Object.assign({}, state);
		case "GET_DISCUSSIONS":
			state.session.discussions = action.discussions
			return Object.assign({}, state);
						
		case "GET_SESSION":
			state.session = action.session;
			return Object.assign({}, state);
	}
	return state;
}
