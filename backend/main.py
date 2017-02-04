from flask import request
from flask_api import FlaskAPI, status
from models import Article, Sentence, db
from pony.orm import db_session

import importing

app = FlaskAPI("immersion")


def article_response(article):
    return {
        "title": article["sentences"][0],
        "sentences": article["sentences"][1:]
    }


@app.route("/article/list")
@db_session
def article_list():
    articles = db.select("""SELECT a.id, s.original, a.source FROM Article AS a
                    JOIN Sentence AS s ON s.article = a.id AND s.`index` = 0
                    ORDER BY a.id DESC
                    """)
    return {"articles": [{
        "id": article[0],
        "title": article[1],
        "source": article[2]
    } for article in articles]}


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


@app.route("/article/<aid>/translate", methods=["POST"])
@db_session
def translate_sentence(aid):
    req_json = request.data
    print(req_json)
    a = Article.get(id=aid)
    this_sent = Sentence.get(article=a, index=int(req_json["sentenceID"]))
    this_sent.translation = req_json["translation"]
    return {"success": True}


@app.route("/upload/text", methods=["GET", "POST"])
def upload_text():
    req_json = request.data
    if "text" not in req_json or "title" not in req_json:
        return {}, status.HTTP_400_BAD_REQUEST
    return importing.create_article(req_json["title"], req_json["text"])


@app.route("/upload/url", methods=["POST"])
def upload_url():
    req_json = request.data
    if "url" not in req_json:
        return {}, status.HTTP_400_BAD_REQUEST
    url = req_json["url"]
    return importing.upload_url(url)


@app.route("/")
def index():
    return "immersion"

if __name__ == "__main__":
    db.bind("sqlite", "immersion.sqlite", create_db=True)
    db.generate_mapping(create_tables=True)

    app.run(host="0.0.0.0")
