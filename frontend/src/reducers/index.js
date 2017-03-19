import update from 'immutability-helper';
import { merge } from "lodash";
import { combineReducers } from "redux";
import { LANGUAGE_LIST, STATS_SUMMARY } from "../actions";

const entities = (state = { articles: [], languages: [], stats: { } }, action) => {
	if (action.res && action.res.articles) {
		return update(state, { articles: { $set: action.res.articles } });
	} else if (action.type == LANGUAGE_LIST.SUCCESS) {
		return update(state, { languages: { $set: action.res } });
	} else if (action.type == STATS_SUMMARY.SUCCESS) {
		console.log("stats success", action.res);
		return update(state, { stats: { summary: { $set: action.res } } });
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
