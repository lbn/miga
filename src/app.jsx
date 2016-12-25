import styles from './index.scss';
import React from 'react';
import { Navbar, Nav, NavItem, Button, Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';

class Sentence extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelectArticle = props.handleSelect;
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect() {
		this.handleSelectArticle(this);
	}

	render() {
		return (
				<span
					className={this.props.selected ? styles.selected : null}
					onClick={this.handleSelect}>{this.props.sentence}</span>
		)
	}
}

class Article extends React.Component {
	render() {
		let sentences = this.props.sentences
			.map((s,index) => <Sentence
					id={index}
					key={index}
					selected={this.props.selectedSentence == index}
					sentence={s}
					handleSelect={this.props.handleSelect} />);
		return (
				<div>
					<div>{sentences}</div>
					<span>Selected sentence: {this.props.selectedSentence}</span>
				</div>
		)
	}
}

class EditTranslation extends React.Component {
	render() {
		return (
				<div className={!this.props.selected?"hidden":""}>
					<div>{this.props.original}</div>
					<FormGroup>
						<FormControl componentClass="textarea" placeholder="Translation" />
					</FormGroup>
				</div>
		)
	}
}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedSentence: null};
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect(sentence) {
		this.setState(prevState => ({
			selectedSentence: sentence.props.id,
		}));
	}
  render() {
		const article = {
			title: "Thinking in React",
			sentences: [
				"Now that we've identified the components in our mock, let's arrange them into a hierarchy.",
				"Now that we've identified the components in our mock, let's arrange them into a hierarchy.",
				"Now that we've identified the components in our mock, let's arrange them into a hierarchy.",
				"Now that we've identified the components in our mock, let's arrange them into a hierarchy.",
			]
		};
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
						sentences={article.sentences} title={article.title}/>
					</Col>
					<Col md={4}>
						<EditTranslation selected={this.state.selectedSentence!=null}
						original={article.sentences[this.state.selectedSentence]}
						/>
					</Col>
				</Row>
			</Grid>
    )
  }
}
