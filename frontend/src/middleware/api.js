const BASE_URL = "/api/";

const callApi = (endpoint, data = {}) => {
	if (!data.headers) {
			data.headers = {"Content-Type": "application/json"};
	}
	if (data.body && typeof data.body != "string") {
		data.body = JSON.stringify(data.body);
	}
	return fetch(BASE_URL + endpoint, data).then(res => {
		return res.json().then(json => {
			if (!res.ok) {
				return Promise.reject(json);
			}
			return json;
		});
	});
};

export const CALL_API = "Call API";

export default store => next => action => {
	const callAction = action[CALL_API];
	if (typeof callAction === "undefined") {
		return next(action);
	}

	let { endpoint } = callAction;
	const { types } = callAction;

	const actionWith = data => {
		const finalAction = Object.assign({}, action, data);
		delete finalAction[CALL_API];
		return finalAction;
	};

	return callApi(endpoint, callAction.data).then(
			res => next(actionWith({
				type: types.SUCCESS,
				res: res
			})),
			error => next(actionWith({
				type: types.FAILURE,
				error: error.message || "wat"
			}))
	);
};
