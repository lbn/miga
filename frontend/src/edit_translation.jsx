import React from 'react';
import ArticleService from './service_article.js';
import { Button, FormGroup, FormControl} from 'react-bootstrap';

class EditTranslation extends React.Component {
	constructor(props) {
		super(props);
		this.articleService = new ArticleService();
	}
	render() {
		return (
				<div className={!this.props.selected?"hidden":""}>
					<div>{this.props.original}</div>
					<FormGroup>
						<FormControl componentClass="textarea" placeholder="Translation" />
					</FormGroup>
					<Button bsStyle="primary">Submit</Button>
				</div>
		)
	}
}

export default EditTranslation;
