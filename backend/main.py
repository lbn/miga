from flask import Flask, jsonify, request
app = Flask("immersion")

article = {
    "original": {
        "sentences": [
            "Firma esta petición: La culpa del machismo de Maluma es mía",
            "Está últimamente la tropa moral en plan comando.",
            "Esto está bien, esto está mal, esto hay que prohibir y esto hay que cantar.",
            "Y uno, que nunca ha sido amigo de la censura, no acaba de entender qué problema ven ahora en la (pésima) canción de un tal Maluma que rapea (o eso se intuye) una canción titulada Cuatro babys.",
            "La letra del tema es infame, vale, en eso estamos de acuerdo.",
            "Es grosera, infantil, 'falocéntrica' y cosifica a la mujer.",
            "Todo ello es de un gusto pésimo y de una mala educación terrible...",
            "¡Hey!",
            "Aquí quería llegar... de una educación terrible.",
        ]
    },
    "translated": {
        "sentences": ["Sign this petition: The blame of Maluma's machismo is on me"]+[""]*8,
    }
}

articles = {
    "1": article,
}

def article_response(article):
    return {
        "title": article["sentences"][0],
        "sentences": article["sentences"][1:]
    }

@app.route("/article/<aid>/original")
def article_original(aid):
    return jsonify(**article_response(articles[aid]["original"]))

@app.route("/article/<aid>/translated")
def article_translated(aid):
    return jsonify(**article_response(articles[aid]["translated"]))

@app.route("/article/<aid>/translate", methods=["POST", "OPTIONS"])
def translate_sentence(aid):
    req_json = request.get_json(silent=True)
    print(req_json)

    translated_sentences = articles[aid]["translated"]["sentences"]
    translated_sentences[int(req_json["sentenceID"])] = req_json["translation"]
    print(translated_sentences)
    return jsonify(success=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
