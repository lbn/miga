import Auth0Lock from "auth0-lock";
import { browserHistory } from "react-router";
import { isTokenExpired } from "./jwtHelper";
import { connect } from "react-redux";
import { userProfileSuccess } from "../actions/auth";

export default class AuthService {
  constructor(store, clientId, domain) {
		this.store = store;
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: "http://localhost:8888/login",
        responseType: "token"
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
		if (this.loggedIn()) {
			this.lock.getProfile(this.getToken(), (error, profile) => {
				if (error) {
					console.log("error", error);
				} else {
					this.store.dispatch(userProfileSuccess(profile));
				}
			});
		}
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the home route
    browserHistory.replace("/");

  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
		const token = this.getToken()
		return !!token && !isTokenExpired(token);
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem("id_token");
  }
};
