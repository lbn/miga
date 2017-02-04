import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import ArticleService from './service_article.js';
import styles from './index.scss';

class Word extends React.Component {
	constructor(props) {
		super(props);
		this.word = this.props.children;
		this.handleEntered = this.handleEntered.bind(this);
		this.articleService = new ArticleService();
		this.state = { translated: "Loading..." };
	}

	handleEntered() {
		this.articleService.translate(this.word).then(res => {
			this.setState({ translated: res.text });
		});
	}

	render() {
		let tooltip = <Tooltip id={this.props.id}>{this.state.translated}</Tooltip>;

		return <OverlayTrigger
				delayShow={1000} onEntered={this.handleEntered}
				placement="top" overlay={tooltip}>
			<span className={styles.word}>{this.word} </span>
		</OverlayTrigger>
	}
}

/*
 * TODO: this approach to tooltips makes loading long articles very slow
 * (think 2 seconds)
 */
function words(sentence) {
	return sentence.split(" ").map((w,i) => <Word key={"id"+i} id={"tt-"+i}>{w}</Word>)
}

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
		const classes = styles.sentence+" "+(this.props.selected ? styles.selected : "");
		// TODO: find a cleaner way to do this if possible
		if (this.props.title) {
			return (
					<h3 className={classes}
						onClick={this.handleSelect}>
						{words(this.props.sentence.text)}
					</h3>
			)
		} else {
			return (
					<span className={classes}
						onClick={this.handleSelect}>
						{words(this.props.sentence.text)}
					</span>
			)
		}
	}
}

export default Sentence;
