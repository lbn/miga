from pony.orm import *

db = Database()

class Article(db.Entity):
    sentences = Set("Sentence")
    source = Required(str)

class Sentence(db.Entity):
    original = Required(str)
    translation = Optional(str)
    article = Required(Article)
    index = Required(int)
