import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory} from 'react-router'
import ArticleOriginal from './article_original.jsx';
import ArticleSplit from './article_split.jsx';
import ArticleFormatSwitcher from './article_nav.jsx';
import App from './app.jsx';
import Home from './home.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import log from 'loglevel';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';

log.setLevel("debug");


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
			<Route path="/article/:id/split" components={{ content: ArticleSplit, nav: ArticleFormatSwitcher}} />
			<Route path="/article/:id/original" components={{ content: ArticleOriginal, nav: ArticleFormatSwitcher}} />
    </Route>
  </Router>
	), document.querySelector("#app"))
