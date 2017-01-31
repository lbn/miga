import React from 'react';
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ArticleService from './service_article.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
		};
		this.articleService = new ArticleService();
		this.articleService.getList().then(res => {
			this.setState({list: res.articles});
		});
	}

	render() {
		console.log(this.state.list)
		let articles = this.state.list.map((article, index) => {
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
