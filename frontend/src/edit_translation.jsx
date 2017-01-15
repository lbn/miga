import React from 'react';
import ArticleService from './service_article.js';
import styles from './index.scss';
import { Button, FormGroup, FormControl} from 'react-bootstrap';
import log from 'loglevel';

export default class EditTranslation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {potentialTranslation: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({potentialTranslation: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.potentialTranslation == "") {
			log.error("Tried to submit a blank potentialTranslation");
			return;
		}
		this.props.submitTranslation(this.state.potentialTranslation).then((ttt) => {
			// success
			// clear the potentialTranslation textbox
			this.setState({potentialTranslation: ""});
		});
	}

	render() {
		const selected = this.props.selectedSentence != null;
		return (
				<div className={!selected?"hidden":""}>
					<div>{this.props.original}</div>
					<form onSubmit={this.handleSubmit}>
						<FormGroup>
							<FormControl
								componentClass="textarea"
								placeholder="Translation"
								value={this.state.potentialTranslation}
								onChange={this.handleChange}/>
						</FormGroup>
						<Button bsStyle="primary" type="submit">Submit</Button>
					</form>
					<div className={styles.previousTranslation}>{this.props.translated}</div>
				</div>
		)
	}
}
