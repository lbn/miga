import update from 'immutability-helper';
import { merge } from "lodash"
import { combineReducers } from "redux"

const entities = (state = { articles: [] }, action) => {
	if (action.res && action.res.articles) {
		return update(state, { $set: { articles: action.res.articles } });
	}
	return state;
};

const changeLangs = (state = {original: "2", target: "1"}, action) => {
	if (action.type != "CHANGE_LANGUAGES") {
		return state;
	}
	return merge({}, state, action.lang);
};

const rootReducer = combineReducers({entities, lang: changeLangs});

export default rootReducer;
