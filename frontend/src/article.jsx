import React from 'react';
import Sentence from './sentence.jsx';

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

export default Article;
