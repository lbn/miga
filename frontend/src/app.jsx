import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';

export default class App extends React.Component {
	constructor(props) {
		super(props);
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
						<NavItem eventKey={1} href="/upload">Upload</NavItem>
					</Nav>
					{this.props.nav}
				</Navbar>
				{this.props.content}
			</Grid>
			)
	}
}
