const types = {
	"IS_EMPTY" : function(text) {
		if(text === "")
			return "텍스트를 입력해주세요."
			
		return false;
	}
}

export default function validate(text, types2 = []) {
	let i, length = types2.length, type, rv;
	for(i= 0; i < length; ++i) {
		type = types[types2[i]]
		if(!type)
			continue

		rv=type(text)
		if(!rv)
			continue


		alert(rv)
		return false

	}
	return true
}