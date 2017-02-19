import { CALL_API } from "../middleware/api"

export const ARTICLE_LIST_REQ = "ARTICLE_LIST_REQ";
export const ARTICLE_LIST_SUCCESS = "ARTICLE_LIST_SUCCESS";
export const ARTICLE_LIST_FAILURE= "ARTICLE_LIST_FAILURE";
export const LANGUAGE_LIST_REQ = "LANGUAGE_LIST_REQ";
export const LANGUAGE_LIST_SUCCESS = "LANGUAGE_LIST_SUCCESS";
export const LANGUAGE_LIST_FAILURE= "LANGUAGE_LIST_FAILURE";

export const articleList = (lang) => ({
	[CALL_API]: {
		types: [ ARTICLE_LIST_REQ, ARTICLE_LIST_SUCCESS, ARTICLE_LIST_FAILURE ],
		endpoint: `article/list/${lang.original}/${lang.target}`
	}
});

export const loadArticleList = () => (dispatch, getState) => {
	return dispatch(articleList(getState().lang));
};

export const languagesList = () => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: [ LANGUAGE_LIST_REQ, LANGUAGE_LIST_SUCCESS, LANGUAGE_LIST_FAILURE ],
		endpoint: `language/list`
	}
});

export const changeLanguages = (lang) => (dispatch, getState) => dispatch({
	type: "CHANGE_LANGUAGES",
	lang: lang
});
