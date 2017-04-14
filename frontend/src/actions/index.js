import { CALL_API } from "../middleware/api";
import { REQUEST, SUCCESS, FAILURE, createRequestTypes } from "./util";

export const ARTICLE_LIST = createRequestTypes("ARTICLE_LIST");

export const articleList = (lang) => ({
	[CALL_API]: {
		types: ARTICLE_LIST,
		endpoint: `article/list/${lang.original}/${lang.target}`
	}
});

export const loadArticleList = () => (dispatch, getState) => {
	return dispatch(articleList(getState().lang));
};

export const LANGUAGE_LIST = createRequestTypes("LANGUAGE_LIST");

export const languagesList = () => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: LANGUAGE_LIST,
		endpoint: `language/list`
	}
});

export const UPLOAD_URL = createRequestTypes("UPLOAD_URL");

export const uploadURL = (url) => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: UPLOAD_URL,
		endpoint: `upload/url`,
		data: {
			method: "POST",
			body: {url, lang: getState().lang}
		}
	}
});

export const UPLOAD_TEXT = createRequestTypes("UPLOAD_TEXT");

export const uploadText = (title, text) => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: UPLOAD_TEXT,
		endpoint: `upload/text`,
		data: {
			method: "POST",
			body: {title, text, lang: getState().lang}
		}
	}
});

export const STATS_SUMMARY = createRequestTypes("STATS_SUMMARY");

export const statsSummary = (period) => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: STATS_SUMMARY,
		endpoint: `stats/summary`,
		data: {
			method: "POST",
			body: {period, lang: getState().lang}
		}
	}
});

export const changeLanguages = (lang) => (dispatch, getState) => dispatch({
	type: "CHANGE_LANGUAGES",
	lang: lang
});
