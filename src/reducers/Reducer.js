const types = {
}

export const addTypes = (types2) => {
	let type
	for(type in types2) {
		types[type] = types2[type]
	}
}
export const checkType = (state, action, etc) => {
	if(!(action.type in types))
		return state
		
	return types[action.type](state, action, etc)
}