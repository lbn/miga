import React from 'react';
import Sentence from './sentence.jsx';
import _ from 'lodash';

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
		let formatSentences = (sentences) => {
			return sentences.map((s,index) => <Sentence
					id={s.index}
					key={index+1}
					selected={this.props.selectedSentence == (s.index)}
					sentence={s}
					handleSelect={this.props.handleSelect} />);
		}
		let sentencesGrouped = _(sentences)
			.groupBy("paraIndex")
			.values()
			.orderBy(p => p[0].paraIndex)
			.map((sentences, pi) => {
				return <p key={pi}>{formatSentences(sentences)}</p>;
			})
			.value();

		return (
				<div>
					<Sentence
						id={0}
						key={0}
						selected={this.props.selectedSentence == 0}
						sentence={this.props.article[type].sentences[0]}
						title={true}
						handleSelect={this.props.handleSelect} />
					<div>{sentencesGrouped}</div>
				</div>
		)
	}
}

