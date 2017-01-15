import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';

export default class ArticleOriginal extends React.Component {
	constructor(props) {
		super(props);
		console.log("App");
		console.log(props);
	}
	render() {
		const navbar = (
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">Immersion</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey={1} href="/about">About</NavItem>
					</Nav>
				</Navbar>
		);
    return (
			<Grid>
				{navbar}
				{this.props.children}
			</Grid>
			)
	}
}
