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
		this.state = {selectedSentence: null, article: null};
		this.handleSelect = this.handleSelect.bind(this);
		this.articleService = new ArticleService();
		this.articleService.getOriginal(1).then(article => {
			this.setState(prevState => ({
				article: article,
			}));
		});
	}
	handleSelect(sentence) {
		this.setState(prevState => ({
			selectedSentence: sentence.props.id,
		}));
	}

	originalSentence() {
		if (!this.state.article) {
			return null;
		}
		return this.state.article.sentences[this.state.selectedSentence];
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
						<EditTranslation selected={this.state.selectedSentence!=null}
						original={this.originalSentence()}
						/>
					</Col>
				</Row>
			</Grid>
    )
  }
}
