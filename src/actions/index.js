import * as types from '../constants/ActionTypes'
import {links} from './Links'

import fetch from './fetch'


/*

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from '../reducers'

let reducer = combineReducers(reducers)
// applyMiddleware supercharges createStore with middleware:
export const store = createStore(reducer, applyMiddleware(thunk))
*/




export const loadAbout = (option) => {
	const {type, target} = option;
	let obj = {type: type};
	for(let key in option) {
		switch(key) {
			case "type":
			case "target":
			case "by":
			case "in":
			case "is_load":
				continue;
		}
		obj[key] = option[key];	
	}
	return obj;
}
const defaultType = {
	"get" : "GET",
	"add" : "POST",
}


export const fetchData = (data) => fetchAbout("", data)
export const fetchAbout = (actions, option) => {
	const {type, value, target, by, is_load} = option;
	
	let _type = (type+"_" + target).toUpperCase();
	option.type = _type;
	if(_type in links) {
		let method = option.method || defaultType[type] || "GET";
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		
		let info = {
			method: method,
			headers : myHeaders,
		};
		let link = links.DOMAIN + links[_type];

		if(option.body ) {
			if(method === "GET") {
				link += "&" + option.body;			
			} else {
				info.body = option.body;
			}
		}
		const matchArray = link.match(/\$([a-zA-Z]+)/g);
		if(matchArray)
			matchArray.forEach((param) => {
				link = link.replace(param, option[param.replace("$", "")]);
			});
	
	
		return fetch(link, info).then((res) => {console.log(res);return res.json()}).then((json) => {
			const obj = {type:_type};
			obj[target] = json;
			if(actions)
				actions.loadAbout(obj);
			return obj;
		});	
	}
	
	actions.loadAbout(option);
}



export const swap = (target, myPosition, targetPosition) => {
	return {type: ("SWAP_" + target).toUpperCase(), myPosition, targetPosition};
}


export const fetchSwap = (actions, target, id, targetId) => {
	let obj = {
		swap:[id, targetId]
	}
	
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve(obj);
		}, 1000);
	});	
	
	
}