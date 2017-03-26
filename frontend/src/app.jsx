import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';

import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore()

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
    return (
			<Provider store={store}>
			<Grid>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">miga</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey={1} href="/upload">Upload</NavItem>
					</Nav>
					{this.props.nav}
				</Navbar>
				{this.props.content}
			</Grid>
			</Provider>
			)
	}
}
