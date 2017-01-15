import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		console.log("App");
		console.log(props);
	}
	render() {
    return (
			<Grid>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">Immersion</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey={1} href="/about">About</NavItem>
					</Nav>
					{this.props.nav}
				</Navbar>
				{this.props.content}
			</Grid>
			)
	}
}
