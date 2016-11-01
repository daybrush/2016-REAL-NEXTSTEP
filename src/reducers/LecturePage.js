import * as Actions from '../constants/ActionTypes'

const initialViewerState = {
	lecture: {
		title:"",
		id:"",
		course: {
			id: -1,
			name : "",
			instructor : [],
		},
		sessions : []
	}
}

export default function ViewerPage(state = initialViewerState, action) {
	switch(action.type ) {
		case "GET_LECTURE":
			state.lecture = action.lecture;
			return Object.assign({}, state);
		case "ADD_SESSION":
			if(state.lecture.sessions)
				state.lecture.sessions.push(action.session);
			return Object.assign({}, state);
	}
	return state;
}
