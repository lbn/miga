import update from 'immutability-helper';
import { merge } from "lodash";
import { combineReducers } from "redux";
import { LANGUAGE_LIST_SUCCESS } from "../actions";

const entities = (state = { articles: [], languages: [] }, action) => {
	if (action.res && action.res.articles) {
		return update(state, { articles: { $set: action.res.articles } });
	} else if (action.type == LANGUAGE_LIST_SUCCESS) {
		return update(state, { languages: { $set: action.res } });
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
