import React from 'react';
import Sentence from './sentence.jsx';

export default class Article extends React.Component {
	render() {
		if (this.props.article.original == null || this.props.article.translated == null) {
			return <div></div>
		}
		let type = "original";
		if (this.props.type == "translated") {
			type = "translated";
		}

		let sentences = this.props.article[type].sentences.slice(1)
			.map((s,index) => <Sentence
					id={index+1}
					key={index+1}
					selected={this.props.selectedSentence == (index+1)}
					sentence={s}
					handleSelect={this.props.handleSelect} />);
		return (
				<div>
					<Sentence
						id={0}
						key={0}
						selected={this.props.selectedSentence == 0}
						sentence={this.props.article[type].sentences[0]}
						title={true}
						handleSelect={this.props.handleSelect} />
					<div>{sentences}</div>
				</div>
		)
	}
}

