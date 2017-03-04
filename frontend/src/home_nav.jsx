import React from 'react';
import { Navbar } from 'react-bootstrap';
import LanguageSelector from "./components/LanguageSelector.jsx";


export default class HomeNav extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Navbar.Collapse className={"pull-right"}>
			<LanguageSelector navbar={true} />
		</Navbar.Collapse>
	}
}

