import React from 'react';
import { Navbar, Nav, NavItem, Button, Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';

import styles from './index.scss';
import ArticleService from './service_article.js';
import Sentence from './sentence.jsx';
import Article from './article.jsx';
import EditTranslation from './edit_translation.jsx';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSentence: null,
			article: {translated: null, original: null},
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.submitTranslation = this.submitTranslation.bind(this);

		this.articleService = new ArticleService();
		Promise.all([
				this.articleService.getOriginal(props.id),
				this.articleService.getTranslated(props.id),
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
		if (this.state.selectedSentence == 0) {
			return this.state.article[type].title;
		} else {
			return this.state.article[type].sentences[this.state.selectedSentence-1];
		}
	}

	submitTranslation(translation) {
		return this.articleService.submitTranslation(this.props.id, this.state.selectedSentence, translation);
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
				<Row>
					<Col md={8}>
						<Article
						handleSelect={this.handleSelect}
						selectedSentence={this.state.selectedSentence}
						article={this.state.article} />
					</Col>
					<Col md={4}>
						<EditTranslation
						selectedSentence={this.state.selectedSentence}
						original={this.selectedSentenceText("original")}
						translated={this.selectedSentenceText("translated")}
						submitTranslation={this.submitTranslation}
						/>
					</Col>
				</Row>
			</Grid>
    )
  }
}
