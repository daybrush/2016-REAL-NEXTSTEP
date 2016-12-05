import openPopup from './OAuth/popup';
import querystring from 'querystring';
import {CALL_API} from "../middleware/api"

function getAnchorSearch(location) {
  const rawAnchor = location.anchor || '';
  const arr       = rawAnchor.split('?');

  return arr.length > 1 ? arr[1] : null;
}

function getSearchQs(location) {
  const rawQs = location.search || '';
  const qs    = rawQs.replace('?', '');

  return qs ? querystring.parse(qs) : {};
}

function getAnchorQs(location) {
  const anchorQs    = getAnchorSearch(location);

  return (anchorQs) ? querystring.parse(anchorQs) : {};
}

function getAllParams(location) {
  return Object.assign({}, getAnchorQs(location), getSearchQs(location));
}


export default class OAuth {
	constructor({client_id, redirect_uri}) {
		this.client_id = client_id
		this.redirect_uri = redirect_uri
		this.provider = "github"
		this.name = "github"
	}
	
	
	listen = ({ popup, provider, state, resolve, reject}) => {
		let creds
	    try {
	      creds = getAllParams(popup.location);
	    } catch (err) {}
	
	    if (creds && creds.code) {
	

	      popup.close();
	
	      return resolve({data : creds});
	    } else if (popup.closed) {
	      return reject({ errors: 'Authentication was cancelled.' });
	    }
	    
		return setTimeout(() => this.listen({ popup, provider, state, resolve, reject }), 20);
	}
	
	getUri = (state) => {
		return "https://github.com/login/oauth/authorize?client_id=" + this.client_id + '&redirect_uri=' +  this.redirect_uri + '&state=' +state + '&scope=user'
	}
	
	login = () =>  dispatch => {

		//random string		
		let state = "abcde"

		const url  = this.getUri(state)
		const popup = openPopup(provider, url, name);		
		const provider = this.provider
		
		return new Promise((resolve, reject) =>{
			this.listen({ popup, provider, state, resolve, reject})
		})
	}
}