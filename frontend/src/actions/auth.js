import { REQUEST, SUCCESS, FAILURE, createRequestTypes } from "./util";

export const USER_PROFILE = createRequestTypes("USER_PROFILE");

export const userProfileSuccess = (profile) => (dispatch, getState) => dispatch({
	type: USER_PROFILE.SUCCESS,
	profile
});
