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
		lessons : []
	}
}

export default function ViewerPage(state = initialViewerState, action) {
	switch(action.type ) {
		case "GET_LECTURE":
			state.lecture = action.value;
			return Object.assign({}, state);
		case "ADD_LESSON":
			if(state.lecture.lessons)
				state.lecture.lessons.push(action.value);
			return Object.assign({}, state);
	}
	return state;
}
