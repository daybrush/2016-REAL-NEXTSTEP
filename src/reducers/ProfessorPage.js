import * as Actions from '../constants/ActionTypes'

const initialState = {
	professor:{
	    name: '',
	    lectures : [],
	    id: 0
	  }
}

export default function reducer(state = initialState, action) {
	switch(action.type ) {
		case Actions.GET_PROFESSOR:
			state.professor = action.value;
			return Object.assign({}, state);
	}
	return state;
}
