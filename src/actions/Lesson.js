import {fetchData} from "./index.js"

export const fetchGetLesson = (id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"lesson", id:id}).then(result =>  dispatch(result))
}
export const fetchGetDiscusssions = (id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"discussions", id:id}).then(result =>  dispatch(result))
}
export const fetchGetDiscusssion = (id) => (dispatch, getState) => {
	return fetchData({type:"get", target:"discussion", id:id}).then(result =>  dispatch(result))
}
export const fetchAddDiscusssion = (id, content) => (dispatch, getState) => {
	return fetchData({type:"add", target:"discussion", id:id, body:"content=" + content}).then(result =>  dispatch(result))
}