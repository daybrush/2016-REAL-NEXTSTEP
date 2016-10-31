import * as types from '../constants/ActionTypes'

let links = {
	"DOMAIN" : 	"http://domain.com"
}


links[types.GET_MY_LECTURES] = "/mylectures.json";
links[types.GET_LECTURE] = "/lecture.json";

links[types.GET_PROFESSOR] = "/professor.json";


links["GET_COURSES"] = "/courses";
links["GET_COURSE"] = "/courses/$id";
links["ADD_LECTURE"] = "/courses/$id";


links["GET_SESSION"] = "/sessions/$id"
links["GET_DISCUSSIONS"] = "/sessions/$id/discussions"
links["ADD_DISCUSSION"] = "/sessions/$id/discussions"
links["GET_DISCUSSION"] = "/discussions/$id"
links["GET_MY_COURSES"] = "/me/courses/participate"

export {links};