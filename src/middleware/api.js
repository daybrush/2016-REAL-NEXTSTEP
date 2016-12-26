import  {links, methodType} from "../actions/Links"
import fetch from "../actions/fetch"


// Extracts the next page URL from Github API response.


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function objectToParam(obj) {
	var str = "";
	for (var key in obj) {
	    if (str != "") {
	        str += "&";
	    }
    str += key + "=" + encodeURIComponent(obj[key]);
	}
	
	return str;
	
}

const callApi = (options) => {
	let {type, url, params, body, endpoint} = options;
	let fullUrl = url || links.DOMAIN +( endpoint || links[type])
	fullUrl = fullUrl.replace("{?projection}", "")
	
	const matchArray = fullUrl.match(/\$([a-zA-Z]+)/g);
	if(matchArray)
		matchArray.forEach((param) => {
			fullUrl = fullUrl.replace(param, params[param.replace("$", "")]);
		});

	let method = options.method || methodType[type.split("_")[0]] || "GET";
	let myHeaders = new Headers();

	myHeaders.append("x-auth-token", sessionStorage.getItem("x-auth-token"))
	let info = {
		method: method,
		headers : myHeaders
	};
	
	if(body ) {
		if(typeof body === "object") {
			body  = objectToParam(body)
		}
		if(method === "GET") {
			
			fullUrl += (fullUrl.indexOf("?") === -1 ? "?" : "&") + body;			
		} else {
			myHeaders.append("Content-Type", "application/json")
			body = options.body;
			info.body = JSON.stringify(body);
		}
	}

  return fetch(fullUrl, info)
    .then(response => {
	    const status = response.status
	    
	    if (!response.ok) {
          	return Promise.reject({
	          	type:"ERROR_" + type,
			  	method: method,
	          	status,
	        	params
			 })
        }
        const token = response.headers.get("x-auth-token");
        if(token)
	        sessionStorage.setItem("x-auth-token", token)

	    return response.json().then(json => {
	        if("error" in json) {
				return Promise.reject({
					type: "ERROR_" + type,
					error : json,
					params
				})
			}
	        return {
		        type: type,
				method: method,
		        value: json,
		        body,
		        params
	        }
		}).catch(err => {
			return {
				type: type,
				status,
				body,
				params
			}
		})
    })

}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  
  return callApi(callAPI).then(
    response => next(response),
    error => {
	    return Promise.reject(error)



	    //return next(result)
	 }
  )
}
