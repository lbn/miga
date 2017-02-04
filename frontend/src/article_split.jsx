import React from 'react';
import ArticleService from './service_article.js';
import { Navbar, Nav, NavItem, Button, Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import Article from './article.jsx';

export default class ArticleSplit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSentence: null,
			article: {translated: null, original: null},
		};
		this.handleSelect = this.handleSelect.bind(this);

		this.articleService = new ArticleService();
		Promise.all([
				this.articleService.getOriginal(props.params.id),
				this.articleService.getTranslated(props.params.id),
		]).then(values => {
			const [original, translated] = values;
			this.setState(prevState => ({
				article: {original: original, translated: translated},
			}));
		});
	}

	handleSelect(sentence) {
		this.setState(prevState => ({
			selectedSentence: sentence.props.id,
		}));
	}

	selectedSentenceText(type) {
		const validTypes = ["original", "translated"];
		if (!validTypes.includes(type) || this.state.article[type] == null) {
			return null
		}
		let sentence = this.state.article[type].sentences[this.state.selectedSentence];
		let s = sentence ? sentence.text : "";
		return s;
	}

  render() {
    return (
				<Row>
					<Col md={6}>
						<Article
						handleSelect={this.handleSelect}
						selectedSentence={this.state.selectedSentence}
						article={this.state.article}
						type={"original"} />
					</Col>
					<Col md={6}>
						<Article
						handleSelect={this.handleSelect}
						selectedSentence={this.state.selectedSentence}
						article={this.state.article}
						type={"translated"} />
					</Col>
				</Row>
    )
  }
}
