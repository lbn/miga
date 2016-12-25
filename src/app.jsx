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
		if (this.props.article == null) {
			return <div></div>
		}
		let sentences = this.props.article.sentences
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

class ArticleService {
	getOriginal(id) {
		//return fetch(`/article/${id}/original`)
		return new Promise(function(resolve, reject){
			const article = {
				title: "Firma esta petición: La culpa del machismo de Maluma es mía",
				sentences: [
					"Está últimamente la tropa moral en plan comando.",
					"Esto está bien, esto está mal, esto hay que prohibir y esto hay que cantar.",
					"Y uno, que nunca ha sido amigo de la censura, no acaba de entender qué problema ven ahora en la (pésima) canción de un tal Maluma que rapea (o eso se intuye) una canción titulada Cuatro babys.",
					"La letra del tema es infame, vale, en eso estamos de acuerdo.",
					"Es grosera, infantil, 'falocéntrica' y cosifica a la mujer.",
					"Todo ello es de un gusto pésimo y de una mala educación terrible...",
					"¡Hey!",
					"Aquí quería llegar... de una educación terrible.",
				]
			};
			resolve(article);
		});
	}
}

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
