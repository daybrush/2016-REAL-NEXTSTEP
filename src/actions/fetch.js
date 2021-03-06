const links = {
	"DOMAIN" : "http://srello.xyz/api",
	"GET":{
		"/courses/search?instructor=[\\d]&state=closed" :"/json/courses.more.json",
		"/courses/[\\d]/participants" : "/json/participants.json",
		"/courses/[\\d]/lectures" : "/json/lectures.json",
		"/lectures/[\\d]" : "/json/lecture.json",
		"/lectures/[\\d]/participants" : "/json/participants.json",
		"/lessons/[\\d]/attachments/[\\d]" : "/json/lesson.json",
		"/me/courses/participate" : "/json/mycourses.json"
	},
	"POST" : {
		"/courses/[\\d]" : "/json/lecture.add.json",
		"/lectures/[\\d]/lessons" : "/json/lesson.add.json",
		"/lessons/[\\d]/discussions" : "/json/discussion.add.json",
		"/me/courses/participate" : "/json/mycourse.add.json",
	}
}

export default function fetch(url, info= {}) {
	info.method  = info.method.toUpperCase()
	const _links = links[info.method || "GET"];
	let _url = url;
	for(let reg in _links) {
		let exec = new RegExp(links.DOMAIN + reg).exec(url);
		if(!exec)
			continue;
			
		_url = _links[reg];
	}
	
	

	return window.fetch(_url, info);
}