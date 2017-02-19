import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ArticleService from './service_article.js';

import { loadArticleList } from "./actions";


class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadArticleList();
	}

	componentWillReceiveProps(nextProps) {
		// Reload if lang changes
		if (nextProps.lang != this.props.lang) {
			this.props.loadArticleList();
		}
	}

	render() {
		let articles = this.props.articles.map((article, index) => {
			return <ListGroupItem key={index} header={article.title} href={`/article/${article.id}/original`}>
				{article.source} - uploaded by Anon on 2017-01-28
				</ListGroupItem>;
		});
		return <div>
			<h1>Home</h1>
			<ListGroup>
				{ articles }
			</ListGroup>
			</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		articles: state.entities.articles,
		lang: state.lang
	};
};

export default connect(mapStateToProps, {
	loadArticleList
})(Home);
