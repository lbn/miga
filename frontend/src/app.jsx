import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';

import { Provider } from "react-redux";

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let content = null;
		if (this.props.content) {
			content = React.cloneElement(this.props.content, {
				auth: this.props.route.auth
			});
		}

		let store = this.props.route.store;
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
					{content}
				</Grid>
			</Provider>
			)
	}
}
