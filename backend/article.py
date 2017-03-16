from flask import Blueprint, request
from pony.orm import db_session
from voluptuous import Schema, Required, Url, Coerce

from models import Article, Sentence, db
from validation import json_schema
import stats

article_api = Blueprint("article", __name__)

@article_api.route("/list/<int:lang_original>/<int:lang_target>")
@db_session
def article_list(lang_original, lang_target):
    articles = db.select("""SELECT a.id, s.original, a.source, date(a.created_at) FROM Article AS a
                    JOIN Sentence AS s ON s.article = a.id AND s.index = 0
                    WHERE a.lang_original = $lang_original AND a.lang_target = $lang_target
                    ORDER BY a.id DESC
                    """)
    return {"articles": [{
        "id": article[0],
        "title": article[1],
        "source": article[2],
        "createdAt": article[3]
    } for article in articles]}


@article_api.route("/<int:aid>/original")
@db_session
def article_original(aid):
    a = Article.get(id=aid)
    return {"sentences":
            [{"text": s.original, "paraIndex": s.para_index, "index": s.index}
             for s in a.sentences.order_by(Sentence.index)]}


@article_api.route("/<int:aid>/translated")
@db_session
def article_translated(aid):
    a = Article.get(id=aid)
    return {"sentences":
            [{"text": s.translation, "paraIndex": s.para_index,
              "index": s.index}
             for s in a.sentences.order_by(Sentence.index)]}


@article_api.route("/<aid>/translate", methods=["POST"])
@db_session
@json_schema(Schema({
    Required("sentenceID"): Coerce(int),
    Required("translation"): str
}))
def translate_sentence(data, aid):
    a = Article.get(id=aid)
    this_sent = Sentence.get(article=a, index=data["sentenceID"])
    this_sent.translation = data["translation"]
    # stats
    # TODO: use celery
    stats.sentence_translate(this_sent.id)
    return {"success": True}
