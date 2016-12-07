import openPopup from './OAuth/popup';

export default class OAuth {
	constructor({client_id, redirect_uri}) {
		this.client_id = client_id
		this.redirect_uri = redirect_uri
		this.provider = "github"
		this.name = "github"
	}
	
	
	
	getUri = (state) => {
		return "https://github.com/login/oauth/authorize?client_id=" + this.client_id + '&redirect_uri=' +  this.redirect_uri + '&state=' +state + '&scope=user'
	}
	
	login = () =>  {

		//random string		
		let state = "abcde"

		const url  = this.getUri(state)
		const popup = openPopup(this.provider, url, this.name);
	}
}