import React from 'react';
import Select from 'react-select';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import { connect } from "react-redux";

import styles from './index.scss';
import { changeLanguages } from "./actions";


var options = [
    { label: 'English', value: '1' },
    { label: 'Spanish', value: '2' },
    { label: 'Polish', value: '3' },
    { label: 'English', value: '4' },
];

class HomeNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.lang;
		this.handleFromChange = this.handleValueChange("original").bind(this);
		this.handleToChange = this.handleValueChange("target").bind(this);
	}

	handleValueChange(field) {
		return (e) => {
			this.setState({[field]: e.value}, () => {
				this.props.changeLanguages(this.state);
			});
		}
	}

	render() {
		return <Navbar.Collapse className={"pull-right"}>
				<Navbar.Text>
				From
				</Navbar.Text>
				<Select
					className={styles.navbarLangSelect}
					name="lang-original"
					value={this.state.original}
					options={options}
					onChange={this.handleFromChange}
				/>
				<Navbar.Text>
				To
				</Navbar.Text>
				<Select
					className={styles.navbarLangSelect}
					name="lang-target"
					value={this.state.target}
					options={options}
					onChange={this.handleToChange}
				/>
		</Navbar.Collapse>
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		lang: state.lang
	};
};

export default connect(mapStateToProps, {
	changeLanguages
})(HomeNav);
