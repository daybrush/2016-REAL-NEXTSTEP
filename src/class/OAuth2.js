export default class OAuth {

	constructor(options) {
		this.client_id = options.client_id
		this.redirect_uri = options.redirect_uri
		this.name = options.name
		this.authorize_uri = options.authorize_uri
		this.width = options.width;
		this.height = options.height;
	}
	

	openPopup(url, name, width, height) {
		const left  = window.innerWidth / 2 - width / 2;
		const top   = window.innerHeight / 2 - height / 2;

		return window.open(url, name, `width=${width},height=${height},top=${top},left=${left},scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no`);
	}
	
	
	
	getUri(state) {
// 		return "http://srello.xyz/api/login/github"
 		return this.authorize_uri + (this.authorize_uri.indexOf("?") === -1 ? "?" : "&" )+  "client_id=" + this.client_id + '&redirect_uri=' +  this.redirect_uri + '&state=' +state;
	}
	
	login() {

		//random string		
		let state = "abcde"

		const url  = this.getUri(state);
		const popup = this.openPopup(url, this.name, this.width, this.height);

	}

}