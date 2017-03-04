import React from 'react';
import Select from 'react-select';
import { Navbar, Nav, NavItem, Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import { connect } from "react-redux";

import styles from '../index.scss';
import { changeLanguages, languagesList } from "../actions";


class LanguageSelector extends React.Component {
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

	componentWillMount() {
		this.props.languagesList();
	}

	render() {
		let textClass = "navbar-text";
		return <div>
				<span className={textClass}>
				From
				</span>
				<Select
					className={styles.navbarLangSelect}
					name="lang-original"
					value={this.state.original}
					options={this.props.languages}
					onChange={this.handleFromChange}
				/>
				<span className={textClass}>
				To
				</span>
				<Select
					className={styles.navbarLangSelect}
					name="lang-target"
					value={this.state.target}
					options={this.props.languages}
					onChange={this.handleToChange}
				/>
			</div>
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		lang: state.lang,
		languages: state.entities.languages.map(
				lang => ({ value: lang.id.toString(), label: lang.name }))
	};
};

export default connect(mapStateToProps, {
	changeLanguages,
	languagesList
})(LanguageSelector);
