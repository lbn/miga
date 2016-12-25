export default class ArticleService {
	constructor() {
		this.baseURL = "http://localhost:8800";
	}

	getOriginal(id) {
		return fetch(`${this.baseURL}/article/${id}/original`).then(a => {
			return a.json();
		});
	}

	getTranslated(id) {
		return fetch(`${this.baseURL}/article/${id}/translated`).then(a => {
			return a.json();
		});
	}

	submitTranslation(id, sentenceID, translation) {
		console.log(id, sentenceID, translation);
		return new Promise((resolve, reject) => {resolve();})
	}
}
