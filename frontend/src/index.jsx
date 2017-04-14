import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { IndexRoute, Router, Route, browserHistory} from "react-router"
import ArticleOriginal from "./article_original.jsx";
import ArticleSplit from "./article_split.jsx";
import ArticleFormatSwitcher from "./article_nav.jsx";
import HomeNav from "./home_nav.jsx";
import App from "./app.jsx";
import Home from "./home.jsx";
import Upload from "./upload.jsx";
import log from "loglevel";
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from "react-bootstrap";
import AuthService from "./utils/AuthService";
import Login from "./components/Login.jsx";

import "bootstrap-loader";
import "react-select/dist/react-select.css";

import configureStore from "./store";

const store = configureStore()

log.setLevel(process.env.LOG_LEVEL);
const auth = new AuthService(store, process.env.AUTH0_CLIENT, process.env.AUTH0_HOST);

const requireAuth = (nextState, replace) => {
	if (!auth.loggedIn()) {
		replace({ pathname: "/login" })
	}
}


render((
  <Router history={browserHistory}>
    <Route path="/" component={App} auth={auth} store={store}>
			<IndexRoute components={{ content: Home, nav: HomeNav }} onEnter={requireAuth} />
			<Route path="/upload" components={{ content: Upload }} onEnter={requireAuth} />
			<Route path="/article/:id/split" components={{ content: ArticleSplit, nav: ArticleFormatSwitcher}} onEnter={requireAuth}/>
			<Route path="/article/:id/original" components={{ content: ArticleOriginal, nav: ArticleFormatSwitcher}} onEnter={requireAuth} />
			<Route path="/login" components={{ content: Login }} />
    </Route>
  </Router>
	), document.querySelector("#app"))
