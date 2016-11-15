import React, {  Component } from 'react'
import { Link } from 'react-router'
import Profile from '../components/Profile'
import StoreSession from "../class/StoreSession"
export default class Header extends Component {
	state = {
		update : true,
		btns : {
			"logo" : (<Link className="header-logo" to="/" key="logo">LOGO</Link>),
			"profile" : (<Profile key="profile"/>)
			
		}
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
		headers.push(btns[btn])
	}
    return (
      <header id="header">
		{headers}
      </header>
    )
  }
}
