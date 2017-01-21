# from flask import Flask, jsonify, request
from flask import request
from flask_api import FlaskAPI, status
from models import Article, Sentence, db
from pony.orm import db_session

app = FlaskAPI("immersion")


def article_response(article):
    return {
        "title": article["sentences"][0],
        "sentences": article["sentences"][1:]
    }


@app.route("/article/<int:aid>/original")
@db_session
def article_original(aid):
    a = Article.get(id=aid)
    return {"sentences":
            [s.original for s in a.sentences.order_by(Sentence.index)]}


@app.route("/article/<int:aid>/translated")
@db_session
def article_translated(aid):
    a = Article.get(id=aid)
    return {"sentences":
            ([s.translation for s in a.sentences.order_by(Sentence.index)])}


@app.route("/article/<aid>/translate", methods=["POST", "OPTIONS"])
@db_session
def translate_sentence(aid):
    req_json = request.data
    print(req_json)
    a = Article.get(id=aid)
    this_sent = Sentence.get(article=a, index=int(req_json["sentenceID"]))
    this_sent.translation = req_json["translation"]
    return {"success": True}


def split_sentences(text):
    for sent in text.split("."):
        if len(sent) > 0:
            yield sent.strip()+"."


@app.route("/upload/text", methods=["GET", "POST", "OPTIONS"])
@db_session
def upload_text():
    req_json = request.data
    if "text" not in req_json or "title" not in req_json:
        return {}, status.HTTP_400_BAD_REQUEST

    article = Article()
    for i, sent in enumerate(split_sentences(req_json["text"])):
        Sentence(original=sent.strip(), index=i, article=article)
    return {"articleID": article.id}


@app.route("/upload/url", methods=["POST", "OPTIONS"])
def upload_url():
    return ""


@app.route("/")
def index():
    return "immersion"

if __name__ == "__main__":
    db.bind("sqlite", "immersion.sqlite", create_db=True)
    db.generate_mapping(create_tables=True)

    app.run(host="0.0.0.0")
