import React, { Component } from 'react'
const pages = {
	loading : function loading() {
		return (
			<div className="message-notify">
				<p><img src="/images/loading.gif" height="60"/></p>
				<p>Loading...</p>
			</div>
			
		)
	},
	error : function error({message,submessage}) {
		return(
			<div className="message-notify">
				<p>{message}</p>
				<p className="message-notify-submessage">{submessage}</p>
			</div>
		)
	}
	
	
}
export default function loadPage(name, params = {}){
	return pages[name](params)	
}