import React from 'react';
import styles from './index.scss';

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
						onClick={this.handleSelect}>{this.props.sentence}</h3>
			)
		} else {
			return (
					<span className={classes}
						onClick={this.handleSelect}>{this.props.sentence}</span>
			)
		}
	}
}

export default Sentence;
