from urllib.parse import urlparse
from collections import namedtuple
from datetime import datetime

from flask import Blueprint
from voluptuous import Schema, Required, Url, Coerce

from pony.orm import db_session, commit
import newspaper

from models import Article, Sentence
from validation import json_schema, lang_schema


upload_api = Blueprint("upload", __name__)

SplitSentence = namedtuple("SplitSentence", "text para_index")



@upload_api.route("/text", methods=["POST"])
@json_schema(Schema({
    Required("text"): str,
    Required("title"): str,
    Required("lang"): lang_schema
}))
def upload_text(data):
    return create_article(**data)


@upload_api.route("/url", methods=["POST"])
@json_schema(Schema({
    Required("url"): Url(),
    Required("lang"): lang_schema
}))
def upload_url(data):
    article = newspaper.Article(data["url"])
    article.download()
    article.parse()
    return create_article(title=article.title,
                          text=article.text,
                          lang=data["lang"],
                          source=urlparse(data["url"]).netloc)


def split_sentences(text):
    paras = text.split("\n\n")
    for pi, para in enumerate(paras):
        for sent in para.split("."):
            if len(sent) == 0:
                continue
            yield SplitSentence(text=sent.strip()+".", para_index=pi)


@db_session
def create_article(title, text, lang, source="text"):
    article = Article(source=source,
                      lang_original=lang["original"],
                      lang_target=lang["target"],
                      created_at=datetime.now())
    Sentence(original=title.strip(), index=0, article=article, para_index=0)
    for i, sent in enumerate(split_sentences(text)):
        Sentence(original=sent.text, index=i+1, para_index=sent.para_index+1,
                 article=article)
    commit()
    return {"articleID": article.id}
