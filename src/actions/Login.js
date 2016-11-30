import {fetchData} from "./index.js"
import {CALL_API} from "../middleware/api"
export const fetchGetLoginInfo = () => ({
	[CALL_API]: {
		type: "get",
		target: "login_info",
	}
})