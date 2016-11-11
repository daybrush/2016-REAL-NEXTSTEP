const links = {
	"GET":{
		"http://domain.com/courses" : "/json/courses.json",	
		"http://domain.com/courses/search?instructor=[\\d]&state=closed" :"/json/courses.more.json",
		"http://domain.com/courses/[\\d]" : "/json/course.json",
		"http://domain.com/courses/[\\d]/participants" : "/json/participants.json",
		"http://domain.com/courses/[\\d]/lectures" : "/json/lectures.json",
		"http://domain.com/lectures/[\\d]" : "/json/lecture.json",
		"http://domain.com/lectures/[\\d]/participants" : "/json/participants.json",
		"http://domain.com/sessions/[\\d]" : "/json/session.json",
		"http://domain.com/sessions/[\\d]/attachments/[\\d]" : "/json/session.json",
		"http://domain.com/sessions/[\\d]/discussions" : "/json/discussions.json",
		
		"http://domain.com/discussions/[\\d]" : "/json/discussion.json",

		"http://domain.com/me" : "/json/login.json",
		"http://domain.com/me/courses/participate" : "/json/mycourses.json"
	},
	"POST" : {
		"http://domain.com/courses/[\\d]" : "/json/lecture.add.json",
		"http://domain.com/lectures/[\\d]/sessions" : "/json/session.add.json",
		"http://domain.com/sessions/[\\d]/discussions" : "/json/discussion.add.json",
		"http://domain.com/me/courses/participate" : "/json/mycourse.add.json",
	}
}

export default function fetch(url, info) {
	const _links = links[info.method];
	let _url = url;
	for(let reg in _links) {
		let exec = new RegExp(reg).exec(url);
		if(!exec)
			continue;
			
		_url = _links[reg];
	}
	
	
	info.method="GET"
	delete info.body
	console.log(url, "=>", _url);
	return window.fetch(_url, info);
}