import React from 'react';
import Sentence from './sentence.jsx';

export default class Article extends React.Component {
	render() {
		if (this.props.article.original == null || this.props.article.translated == null) {
			return <div></div>
		}
		let sentences = this.props.article.original.sentences
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
						sentence={this.props.article.original.title}
						title={true}
						handleSelect={this.props.handleSelect} />
					<div>{sentences}</div>
					<span>Selected sentence: {this.props.selectedSentence}</span>
				</div>
		)
	}
}

