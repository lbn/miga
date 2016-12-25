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
		return (
				<span
					className={styles.sentence+" "+(this.props.selected ? styles.selected : "")}
					onClick={this.handleSelect}>{this.props.sentence}</span>
		)
	}
}

export default Sentence;
