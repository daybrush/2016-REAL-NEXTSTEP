import React, {  Component } from 'react'
import { Link } from 'react-router'
import Profile from '../components/Profile'
import StoreSession from "../class/StoreSession"
export default class Header extends Component {
	state = {
		update : true,
		btns : {
			"logo" : (<Link className="header-logo" to="/" key="logo"><img src="/images/logo.png" alt="logo"/></Link>),
			"profile" : (<Profile key="profile"/>)
			
		}
	}
	addButton(btns) {
		let obj = this.state.btns
		for(let name in btns) {
			if(!btns.hasOwnProperty(name))
				continue
			obj[name] = btns[name];
		}
		this.setState({update:true})
		
		console.log("header", this.state)
	}
	componentWillMount() {
		StoreSession.setStore("header", this)	
	}
	componentWillUnMount() {
		StoreSession.unsetStore("header", this)
	}
  render() {
	let headers = []
	const {btns} = this.state
	for(let btn in btns) {
		if(!btns.hasOwnProperty(btn))
			continue
		headers.push(btns[btn])
	}
    return (
      <header id="header">
		{headers}
      </header>
    )
  }
}
