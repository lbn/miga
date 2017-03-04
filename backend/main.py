from flask_api import FlaskAPI
from pony.orm import db_session, count
import pycountry

from models import Language, db
from translate import translate_api
from upload import upload_api
from article import article_api
from validation import InvalidUsage

app = FlaskAPI("immersion")

app.register_blueprint(article_api, url_prefix="/article")
app.register_blueprint(translate_api, url_prefix="/translate")
app.register_blueprint(upload_api, url_prefix="/upload")

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    return error.to_dict(), error.status_code


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
