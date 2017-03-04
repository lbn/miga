from flask import request
from flask_api import FlaskAPI
from pony.orm import db_session, count
import pycountry

from models import Article, Sentence, Language, db
from translate import translate_api
from upload import upload_api
from validation import InvalidUsage
app = FlaskAPI("immersion")

app.register_blueprint(translate_api, url_prefix="/translate")
app.register_blueprint(upload_api, url_prefix="/upload")

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    return error.to_dict(), error.status_code


@app.route("/article/list/<int:lang_original>/<int:lang_target>")
@db_session
def article_list(lang_original, lang_target):
    articles = db.select("""SELECT a.id, s.original, a.source FROM Article AS a
                    JOIN Sentence AS s ON s.article = a.id AND s.`index` = 0
                    WHERE a.lang_original = $lang_original AND a.lang_target = $lang_target
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
            [{"text": s.original, "paraIndex": s.para_index, "index": s.index}
             for s in a.sentences.order_by(Sentence.index)]}


@app.route("/article/<int:aid>/translated")
@db_session
def article_translated(aid):
    a = Article.get(id=aid)
    return {"sentences":
            [{"text": s.translation, "paraIndex": s.para_index,
              "index": s.index}
             for s in a.sentences.order_by(Sentence.index)]}


@app.route("/article/<aid>/translate", methods=["POST"])
@db_session
def translate_sentence(aid):
    req_json = request.data
    print(req_json)
    a = Article.get(id=aid)
    this_sent = Sentence.get(article=a, index=int(req_json["sentenceID"]))
    this_sent.translation = req_json["translation"]
    return {"success": True}


@app.route("/language/list")
@db_session
def language_list():
    return [{"id": lang.id, "name": lang.name} for lang in Language.select()]

@app.route("/")
def index():
    return "immersion"

@db_session
def populate_languages():
    if count(lang for lang in Language) != 0:
        return

    with open("languages.txt") as f:
        for name in f.readlines():
            name = name.strip()
            Language(name=name, code=pycountry.languages.get(name=name).alpha_2)



def main():
    db.bind("sqlite", "immersion.sqlite", create_db=True)
    db.generate_mapping(create_tables=True)
    populate_languages()

    app.run(host="0.0.0.0")

if __name__ == "__main__":
    main()
