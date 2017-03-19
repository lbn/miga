import React from "react";
import { connect } from "react-redux";
import { statsSummary } from "../actions";
import StatsSummary from "../components/StatsSummary";

class SummarySidebar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(period) {
		this.props.statsSummary(period);
	}

	componentWillMount() {
		this.props.statsSummary(StatsSummary.defaultPeriod);
	}

	render() {
		if (!this.props.stats.summary) {
			return <span>"Loading..."</span>;
		}
		const summary = this.props.stats.summary;
		return <StatsSummary
			streak={summary.streak}
			sentences={summary.sentences}
			words={summary.words}
			practised={summary.practised}
			onSelectPeriod={this.handleSelect}
		/>
	}
};


const mapStateToProps = (state, ownProps) => {
	return {
		stats: state.entities.stats
	};
};

export default connect(mapStateToProps, {
	statsSummary
})(SummarySidebar);
