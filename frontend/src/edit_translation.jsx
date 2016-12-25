import React from 'react';
import ArticleService from './service_article.js';
import styles from './index.scss';
import { Button, FormGroup, FormControl} from 'react-bootstrap';

export default class EditTranslation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {translation: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({translation: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.translation == "") {
			console.error("Tried to submit a blank translation");
			return;
		}
		this.props.submitTranslation(this.state.translation).then(() => {
			this.setState({translation: ""})
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
								value={this.state.translation}
								onChange={this.handleChange}/>
						</FormGroup>
						<Button bsStyle="primary" type="submit">Submit</Button>
					</form>
					<div className={styles.previousTranslation}>{this.props.translated}</div>
				</div>
		)
	}
}
