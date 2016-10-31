import {fetchData, store} from "./index.js"

export const fetchGetSession = (id) => (dispatch, getState) => {
		fetchData({type:"get", target:"session", id:id}).then(result =>  dispatch(result))
}
export const fetchGetDiscusssions = (id) => (dispatch, getState) => {
	fetchData({type:"get", target:"discussions", id:id}).then(result =>  dispatch(result))
}
export const fetchGetDiscusssion = (id) => (dispatch, getState) => {
	fetchData({type:"get", target:"discussion", id:id}).then(result =>  dispatch(result))
}
export const fetchAddDiscusssion = (id, content) => (dispatch, getState) => {
	fetchData({type:"add", target:"discussion", id:id, body:"content=" + content}).then(result =>  dispatch(result))
}