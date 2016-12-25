class ArticleService {
	getOriginal(id) {
		//return fetch(`/article/${id}/original`)
		return new Promise(function(resolve, reject){
			const article = {
				title: "Firma esta petición: La culpa del machismo de Maluma es mía",
				sentences: [
					"Está últimamente la tropa moral en plan comando.",
					"Esto está bien, esto está mal, esto hay que prohibir y esto hay que cantar.",
					"Y uno, que nunca ha sido amigo de la censura, no acaba de entender qué problema ven ahora en la (pésima) canción de un tal Maluma que rapea (o eso se intuye) una canción titulada Cuatro babys.",
					"La letra del tema es infame, vale, en eso estamos de acuerdo.",
					"Es grosera, infantil, 'falocéntrica' y cosifica a la mujer.",
					"Todo ello es de un gusto pésimo y de una mala educación terrible...",
					"¡Hey!",
					"Aquí quería llegar... de una educación terrible.",
				]
			};
			resolve(article);
		});
	}
}

export default ArticleService;
