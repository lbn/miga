import React, { PropTypes } from 'react';
import { Grid, Col, Row, Nav, NavItem, Badge } from 'react-bootstrap';
import styles from '../index.scss';


const Streak = (props) => {
	let classes = [
		styles.streakContainer,
	];
	let message;
	if (props.days != 0) {
		if (props.practised) {
			classes.push(styles.streakPractised);
		} else {
			classes.push(styles.streakNotPractised);
			message = <p className={styles.streakPractiseMessage}>
				Practise today to keep your streak
			</p>;
		}
	}
	return <div className={classes.join(" ")}>
		<span className={styles.streakDays}>{ props.days }</span> day{props.days != 1 ? "s": ""}
		{ message }
	</div>
}

export default class StatsSummary extends React.Component {
	static defaultPeriod = "day"

	static propTypes = {
		practised: PropTypes.bool.isRequired,
		streak: PropTypes.number.isRequired,
		sentences: PropTypes.number.isRequired,
		words: PropTypes.number.isRequired,
		onSelectPeriod: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
		this.state = { active: StatsSummary.defaultPeriod };
	}

	handleSelect(key) {
		this.setState({ active: key }, () => {
			this.props.onSelectPeriod(key);
		});
	}

	render() {
		return <div>
				<Row>
					<Col md={12}>
						<Streak days={this.props.streak} practised={this.props.practised} />
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<Nav bsStyle="pills" stacked activeKey={this.state.active} onSelect={this.handleSelect}>
							<NavItem eventKey={"day"}>Day</NavItem>
							<NavItem eventKey={"week"}>Week</NavItem>
							<NavItem eventKey={"month"}>Month</NavItem>
							<NavItem eventKey={"alltime"}>All time</NavItem>
						</Nav>
					</Col>
					<Col md={8}>
						<p><Badge>{ this.props.sentences }</Badge> sentences</p>
						<p><Badge>{ this.props.words }</Badge> words</p>
					</Col>
				</Row>
			</div>
	}
};

