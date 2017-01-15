import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';

export default class ArticleFormatSwitcher  extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Nav>
				<NavItem eventKey={1} href={`/article/${this.props.params.id}/original`}>Original</NavItem>
				<NavItem eventKey={2} href={`/article/${this.props.params.id}/split`}>Split view</NavItem>
		</Nav>
	}
}
