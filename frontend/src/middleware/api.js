const BASE_URL = "/api/";

const callApi = (endpoint) => {
	return fetch(BASE_URL + endpoint).then(res => {
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

	const [ requestType, successType, failureType ] = types;


	return callApi(endpoint).then(
			res => next(actionWith({
				res: res,
				type: successType
			})),
			error => next(actionWith({
				type: failureType,
				error: error.message || "wat"
			}))
	);
};
