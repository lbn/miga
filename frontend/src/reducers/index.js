import update from 'immutability-helper';
import { merge } from "lodash";
import { combineReducers } from "redux";
import { LANGUAGE_LIST, STATS_SUMMARY } from "../actions";
import { USER_PROFILE } from "../actions/auth";

const entities = (state = { articles: [], languages: []}, action) => {
	if (action.res && action.res.articles) {
		return update(state, { articles: { $set: action.res.articles } });
	} else if (action.type == LANGUAGE_LIST.SUCCESS) {
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

const stats = (state = {summary: {
	practised: false,
	streak: -1,
	sentences: -1,
	words: -1
}}, action) => {
	if (action.type == STATS_SUMMARY.SUCCESS) {
		return { summary: action.res };
	}
	return state;
};

const userProfile = (state = {}, action) => {
	if (action.type == USER_PROFILE.SUCCESS) {
		return action.profile;
	}
	return state;
};

const rootReducer = combineReducers({
	entities,
	stats,
	userProfile,
	lang: changeLangs
});

export default rootReducer;
