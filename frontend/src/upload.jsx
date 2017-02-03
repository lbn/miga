import React from 'react';
import { Tab, Tabs, FormGroup, ControlLabel, HelpBlock, FormControl, Button } from 'react-bootstrap';
import ArticleService from './service_article.js';
import { browserHistory } from 'react-router'


class TextUploader extends React.Component {
	constructor(props) {
		super(props);
		this.state = { title: "", text: "" };
		this.articleService = new ArticleService();
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleTextChange(e) {
		this.setState({ text: e.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.title == "") {
			log.error("Tried to upload text with no title");
			return;
		}
		if (this.state.text == "") {
			log.error("Tried to upload text with no body");
			return;
		}
		this.articleService.uploadText(this.state.title, this.state.text).then(res => {
			// success
			this.setState({title: "", text: ""});
			browserHistory.push(`/article/${res.articleID}/original`);
		});
	}

	render() {
		return <form id="formUploadText" onSubmit={this.handleSubmit}>
			<FormGroup controlId="formTitle">
				<FormControl
				value={this.state.title}
				type="text"
				required="true"
				placeholder="Title"
				onChange={this.handleTitleChange} />
			</FormGroup>
			<FormGroup controlId="formText">
				<FormControl
				value={this.state.text}
				componentClass="textarea"
				placeholder="Body"
				required="true"
				onChange={this.handleTextChange} />
			</FormGroup>
			<Button bsStyle="primary" type="submit">Submit</Button>
			</form>
	}
}

class URLUploader extends React.Component {
	constructor(props) {
		super(props);
		this.state = { url: "" };
		this.articleService = new ArticleService();
		this.handleURLChange = this.handleURLChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleURLChange(e) {
		this.setState({ url: e.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.url == "") {
			log.error("Tried to upload an article with empty URL");
			return;
		}
		this.articleService.uploadURL(this.state.url).then(res => {
			// success
			this.setState({url: ""});
			browserHistory.push(`/article/${res.articleID}/original`);
		});
	}

	render() {
		return <form id="formUploadURL" onSubmit={this.handleSubmit}>
			<FormGroup controlId="formURL">
				<FormControl
				value={this.state.url}
				type="text"
				required="true"
				placeholder="URL"
				onChange={this.handleURLChange} />
			</FormGroup>
			<Button bsStyle="primary" type="submit">Submit</Button>
		</form>
	}
}

export default class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.articleService = new ArticleService();
	}

	render() {
		return <div>
			<h1>Upload</h1>
			<Tabs id={"upload"} defaultActiveKey={1}>
				<Tab eventKey={1} title="URL">
					<URLUploader />
				</Tab>
				<Tab eventKey={2} title="Text">
					<TextUploader />
				</Tab>
			</Tabs>
			</div>
	}
}
