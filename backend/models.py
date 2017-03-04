from datetime import datetime

from pony.orm import *

db = Database()

class Language(db.Entity):
    code = Required(str, unique=True)
    name = Required(str)

    articles_original = Set("Article")
    articles_target = Set("Article")

class Article(db.Entity):
    sentences = Set("Sentence")
    source = Required(str)

    created_at = Required(datetime)

    lang_original = Required(Language, reverse="articles_original")
    lang_target = Required(Language, reverse="articles_target")

class Sentence(db.Entity):
    original = Required(str)
    translation = Optional(str)
    article = Required(Article)
    index = Required(int)
    para_index = Required(int)
