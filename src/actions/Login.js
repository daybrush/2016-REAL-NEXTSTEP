import {fetchData} from "./index.js"

export const fetchGetLoginInfo = () => (dispatch, getState) => {
	return fetchData({type:"get", target:"login_info"}).then(result =>  dispatch(result))
}