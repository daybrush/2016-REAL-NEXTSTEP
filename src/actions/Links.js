import * as types from '../constants/ActionTypes'

let links = {
	"DOMAIN" : 	"http://domain.com"
}


links[types.GET_MY_LECTURES] = "/mylectures.json";


links[types.GET_PROFESSOR] = "/professor.json";

links["GET_COURSES_MORE"] = "/courses/search?instructor=$id&state=closed"
links["GET_COURSES"] = "/courses";
links["GET_COURSE"] = "/courses/$id";
links["ADD_LECTURE"] = "/courses/$id";

links["GET_LECTURE"] = "/lectures/$id";


links["GET_SESSION"] = "/sessions/$id"
links["GET_DISCUSSIONS"] = "/sessions/$id/discussions"
links["ADD_DISCUSSION"] = "/sessions/$id/discussions"
links["GET_DISCUSSION"] = "/discussions/$id"
links["GET_PARTICIPANTS"] = "/lectures/$id/participants"

links["ADD_MY_COURSE"] = "/me/courses/participate";
links["GET_MY_COURSES"] = "/me/courses/participate"

export {links};